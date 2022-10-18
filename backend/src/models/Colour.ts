import mongoose from 'mongoose';
import {cascadeDelete} from "../utilities/functions/misc";
const Stamp = require('../models/Stamp')
const Cwimpie = require('../models/Cwimpie')

const ColourSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        hexCode: {
            type: String,
            required: true,
            trim: true
        },
    },
    {
        collection: "Colours"
    }
)

ColourSchema.post('findOneAndDelete', async function (res, next) {
    await cascadeDelete(Stamp, this, "primary_colour");
    await cascadeDelete(Stamp, this, "accent_colour");
    await cascadeDelete(Cwimpie, this, "colour_id");
})

module.exports = mongoose.model('Colour', ColourSchema);