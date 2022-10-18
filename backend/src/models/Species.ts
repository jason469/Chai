import mongoose from 'mongoose';
import {SpeciesChoices} from "../utilities/enums/modelEnums";

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
        }
    },
    {
        collection: "Species"
    }
)

module.exports = mongoose.model('Species', SpeciesSchema);