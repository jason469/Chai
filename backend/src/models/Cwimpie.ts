import mongoose from 'mongoose';
import {cascadeDelete} from "../utilities/functions/misc";
import {CwimpieSexes} from "../utilities/enums/modelEnums";
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
            type: String,
        },
        sex: {
            type: String,
            required: true,
            enum: Object.values(CwimpieSexes),
            default: CwimpieSexes.Male
        },
        birthdate: {
            type: Date
        },
        partnerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cwimpie'
        },
        dailyScheduleId: [  // A cwimpie can have many schedules
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'DailySchedule'
            }
        ],
        colourId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Colours'
        },
        speciesId: {
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
        primaryParentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        stampId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Stamp'
        }
    },
    {
        collection: "Cwimpies"
    }
);

CwimpieSchema.post("deleteOne", { document: true, query: false },async function (cwimpie, next) {
    await cascadeDelete(DailySchedule, this, "cwimpieId");
    await cascadeDelete(Stamp, this, "stampId");
})


const Cwimpie = mongoose.model('Cwimpie', CwimpieSchema);
module.exports = Cwimpie;