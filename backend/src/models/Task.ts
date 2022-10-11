import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
        },
        start_time: {
            type: Date,
        },
        end_time: {
            type: Date,
        },
        durationMinutes: {
            type: Number,
        },
        isCompleted: {
            type: Boolean
        },
        dailySchedule_id: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'DailySchedule'
            }
        ]
    },
    {
        collection: "Tasks"
    }
)

module.exports = mongoose.model('Task', TaskSchema);