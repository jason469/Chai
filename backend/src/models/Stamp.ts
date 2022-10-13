import mongoose from 'mongoose';
import {FontChoices} from "../utilities/enums/model_enums";

const StampSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Stamp', StampSchema);