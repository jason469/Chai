import mongoose from 'mongoose';

const cwimpieSchema = new mongoose.Schema(
    {
        name: {
            required: true,
            type: String,
            trim: true,
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        birthdate: {
            required: true,
            type: Date
        },
        partner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cwimpie'
        },
        dailySchedule_id: [  // A cwimpie can have many schedules
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'DailySchedule'
            }
        ],
        colour_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Colour'
        },
        species_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Species'
        },
        favourites: [  // A cwimpie can have many favourites
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Favourite'
            }
        ],
        professions: [{  // A cwimpie can have many professions
            type: mongoose.Schema.Types.ObjectId,
            ref:'Profession'
        }],
        hobbies: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Hobby'
        }],
        primary_parent_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        stamp_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Stamp'
        }
    },
    {
        collection: "Cwimpies"
    }
);

const Cwimpie = mongoose.model('Cwimpie', cwimpieSchema);
module.exports = Cwimpie;