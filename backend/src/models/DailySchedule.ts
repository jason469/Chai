import mongoose from 'mongoose';
import {cascadeDelete} from "../utilities/functions/misc";

const TaskService = require('../services/task')
const Cwimpie = require("./Cwimpie");

const DailyScheduleSchema = new mongoose.Schema({
        date: {
            type: Date,
            required: true,
        },
        cwimpieName: {
            type: String,
            required: true
        },
        tasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Task'
            }
        ]
    },
    {
        collection: "DailySchedules"
    }
)

DailyScheduleSchema.post("deleteOne", {document: true, query: false}, async function (task, next) {
    let allTasks = this.tasks
    for (let taskId of allTasks) {
        await TaskService.deleteTask(taskId)
    }
    await cascadeDelete(Cwimpie, this, "dailyScheduleId");  // Remove reference to daily schedule in Cwimpie
    return
})


module.exports = mongoose.model('DailySchedule', DailyScheduleSchema);