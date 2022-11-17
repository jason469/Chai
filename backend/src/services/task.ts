import {ITask} from "../utilities/interfaces/modelInterfaces";

const Task = require('../models/Task')

module.exports = class TaskService {
    static async getAllTasks() {
        try {
            return await Task.find();
        } catch (error) {
            console.log(`Could not fetch tasks ${error}`)
        }
    }

    static async createTask(data: ITask) {
        try {
            let task = new Task({
                name: data.name,
                description: data.description,
                startTime: data.startTime,
                endTime: data.endTime,
                durationMinutes: data.durationMinutes,
                isCompleted: data.isCompleted,
                dailyScheduleId: data.dailyScheduleId
            })
            await task.save()
            return task
        } catch (error) {
            console.log(`Could not fetch task ${error}`)
        }
    }

    static async deleteTask(id: string) {
        try {
            await Task.findOneAndDelete({"_id": id});
            return true
        } catch (error) {
            console.log(`Could not delete task ${error}`)
            return false
        }
    }
}