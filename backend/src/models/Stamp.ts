import mongoose from 'mongoose';
import {FontChoices} from "../utilities/enums/modelEnums";
import {cascadeDelete} from "../utilities/functions/misc";
const Cwimpie = require("./Cwimpie");

const StampSchema = new mongoose.Schema({
        name: String,
        primary_colour: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Colour'
        },
        accent_colour: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Colour'
        },
        font: {
            type: String,
            required: true,
            enum: Object.values(FontChoices),
            default: FontChoices.Arial
        }
    },
    {
        collection: "Stamps"
    }
)

StampSchema.post("deleteOne", { document: true, query: false },async function (stamp, next) {
    await cascadeDelete(Cwimpie, this, "stamp_id");
})

module.exports = mongoose.model('Stamp', StampSchema);