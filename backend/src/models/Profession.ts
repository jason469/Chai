import mongoose from 'mongoose';
import {ProfessionTypes} from "../utilities/enums/modelEnums";
import {cascadeDelete} from "../utilities/functions/misc";
const Cwimpie = require("./Cwimpie");

const ProfessionSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
        },
        type: {
            type: String,
            required: true,
            enum: Object.values(ProfessionTypes),
            default: ProfessionTypes.Main
        }
    },
    {
        collection: "Professions"
    }
)

ProfessionSchema.post("deleteOne", { document: true, query: false },async function (profession, next) {
    await cascadeDelete(Cwimpie, this, "professions");
})


module.exports = mongoose.model('Profession', ProfessionSchema);