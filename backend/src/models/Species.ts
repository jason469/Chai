import mongoose from 'mongoose';
import {SpeciesChoices} from "../utilities/enums/model_enums";

const SpeciesSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        type: {
            type: String,
            required: true,
            enum: Object.values(SpeciesChoices),
            default: SpeciesChoices.Bunny
        },
        cwimpie_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cwimpie'
        },
    },
    {
        collection: "Species"
    }
)

module.exports = mongoose.model('Species', SpeciesSchema);