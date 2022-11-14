import mongoose from 'mongoose';
import {cascadeDelete} from "../utilities/functions/misc";
const DailySchedule = require("./DailySchedule");
const Stamp = require("./Stamp");

const CwimpieSchema = new mongoose.Schema(
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
            type: Date
        },
        partner_id: {
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
            ref:'Colours'
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
        primaryParent_id: {
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

CwimpieSchema.post("deleteOne", { document: true, query: false },async function (cwimpie, next) {
    await cascadeDelete(DailySchedule, this, "cwimpie_id");
    await cascadeDelete(Stamp, this, "stamp_id");
})


const Cwimpie = mongoose.model('Cwimpie', CwimpieSchema);
module.exports = Cwimpie;