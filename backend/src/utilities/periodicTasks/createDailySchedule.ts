import moment from "moment";
import {ITask} from "../interfaces/modelInterfaces";
import {taskDescriptions} from "../randomValues/taskDescriptions";

const schedule = require('node-schedule')
const _ = require('lodash');

const taskService = require('../../services/task')
const DailySchedule = require('../../models/DailySchedule')
const Task = require('../../models/Task')
const Cwimpie = require('../../models/Cwimpie')

const taskTimes = [8, 14, 17]

export const createDailySchedules = () => {
    schedule.scheduleJob('0 0 * * *', async () => {
        console.log('Creating daily schedules')

        let taskDurationMinutes = 40;
        let allCwimpies = await Cwimpie.find()
        for await (let cwimpie of allCwimpies) {
            let dailySchedule = new DailySchedule()
            let listOfTasks: typeof Task[] = []
            for (let taskTime of taskTimes) {
                let startDate = moment().add(taskTime, 'hours')
                let endDate = moment(startDate).add(taskDurationMinutes, 'minutes')
                let taskDescription = _.sample(taskDescriptions)
                let taskConfig: ITask = {
                    dailyScheduleId: dailySchedule,
                    description: taskDescription,
                    startTime: startDate.toDate(),
                    endTime: endDate.toDate(),
                    durationMinutes: taskDurationMinutes,
                    isCompleted: true,
                    name: `${cwimpie.name} task at ${startDate}`,
                }
                let task = await taskService.createTask(taskConfig)
                listOfTasks.push(task)
            }
            dailySchedule.date = new Date()
            dailySchedule.cwimpieId = cwimpie
            dailySchedule.tasks = listOfTasks
            await dailySchedule.save()
            cwimpie.dailyScheduleId.push(dailySchedule)
            cwimpie.save()
        }
    })
}