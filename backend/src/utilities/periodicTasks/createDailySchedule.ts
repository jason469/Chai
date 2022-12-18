import moment from "moment";
import {ITask} from "../interfaces/modelInterfaces";
import {allTaskData} from "../randomValues/taskData";
import {allCwimpiesCache} from "../../config/caches/allCaches";

const schedule = require('node-schedule')
const _ = require('lodash');

const taskService = require('../../services/task')
const DailySchedule = require('../../models/DailySchedule')
const Task = require('../../models/Task')
const CwimpieService = require('../../services/cwimpie')

const taskTimes = [8, 14, 17]

export const createDailySchedules = () => {
    schedule.scheduleJob('0 0 * * *', async () => {
    // schedule.scheduleJob('* * * * *', async () => {
        console.log('Creating daily schedules')

        let taskDurationMinutes = 40;
        let allCwimpies = await CwimpieService.getAllCwimpies()
        for await (let cwimpie of allCwimpies) {
            let dailySchedule = new DailySchedule()
            let listOfTasks: typeof Task[] = []
            for (let taskTime of taskTimes) {
                let startDate = moment().add(taskTime, 'hours')
                let endDate = moment(startDate).add(taskDurationMinutes, 'minutes')
                let taskData = _.sample(allTaskData)
                let taskConfig: ITask = {
                    description: taskData.description,
                    startTime: startDate.toDate(),
                    endTime: endDate.toDate(),
                    durationMinutes: taskDurationMinutes,
                    isCompleted: true,
                    name: taskData.name,
                }
                let task = await taskService.createTask(taskConfig)
                listOfTasks.push(task)
            }
            dailySchedule.date = new Date()
            dailySchedule.cwimpieName = cwimpie.name
            dailySchedule.tasks = listOfTasks
            await dailySchedule.save()
            console.log(dailySchedule)
            cwimpie.dailyScheduleId.push(dailySchedule)
            await cwimpie.save()
            let numberOfSchedules = cwimpie.dailyScheduleId.length
            if (numberOfSchedules > 5) {
                let deleteDailyScheduleId = cwimpie.dailyScheduleId[0]
                cwimpie.dailyScheduleId.splice(0, 1)
                DailySchedule.findByIdAndDelete(deleteDailyScheduleId)
            }
            await cwimpie.save()
            await allCwimpiesCache.setValueByKey(cwimpie.name, {...cwimpie._doc})
        }
    })
}