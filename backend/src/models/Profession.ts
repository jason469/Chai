import mongoose from 'mongoose';
import {ProfessionTypes} from "../utilities/enums/modelEnums";

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

module.exports = mongoose.model('Profession', ProfessionSchema);