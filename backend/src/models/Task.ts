import mongoose from 'mongoose';
import {cascadeDelete} from "../utilities/functions/misc";

const DailySchedule = require("./DailySchedule");

const TaskSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
        },
        startTime: {
            type: Date,
        },
        endTime: {
            type: Date,
        },
        durationMinutes: {
            type: Number,
        },
        isCompleted: {
            type: Boolean
        },
        dailyScheduleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DailySchedule'
        }
    },
    {
        collection: "Tasks"
    }
)

TaskSchema.post("deleteOne", {document: true, query: false}, async function (task, next) {
    await cascadeDelete(DailySchedule, this, "tasks");
})


module.exports = mongoose.model('Task', TaskSchema);