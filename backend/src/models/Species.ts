import mongoose from 'mongoose';
import {SpeciesChoices} from "../utilities/enums/modelEnums";
import {cascadeDelete} from "../utilities/functions/misc";

const Cwimpie = require("./Cwimpie");

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
        iconName: {
            type: String
        }
    },
    {
        collection: "Species"
    }
)

SpeciesSchema.post("deleteOne", {document: true, query: false}, async function (species, next) {
    await cascadeDelete(Cwimpie, this, "species_id");
})

module.exports = mongoose.model('Species', SpeciesSchema);