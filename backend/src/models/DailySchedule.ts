import mongoose from 'mongoose';

const DailyScheduleSchema = new mongoose.Schema({
        date: {
            type: Date,
            required: true,
        },
        cwimpie_id:             {
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

module.exports = mongoose.model('DailySchedule', DailyScheduleSchema);