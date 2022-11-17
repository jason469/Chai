import mongoose from 'mongoose';
const TaskService = require('../services/task')

const DailyScheduleSchema = new mongoose.Schema({
        date: {
            type: Date,
            required: true,
        },
        cwimpieId:             {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cwimpie'
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
    return})


module.exports = mongoose.model('DailySchedule', DailyScheduleSchema);