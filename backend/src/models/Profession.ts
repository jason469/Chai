import mongoose from 'mongoose';
import {ProfessionTypes} from "../utilities/enums/model_enums";

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
        },
        cwimpie_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cwimpie'
        },
    },
    {
        collection: "Professions"
    }
)

module.exports = mongoose.model('Profession', ProfessionSchema);