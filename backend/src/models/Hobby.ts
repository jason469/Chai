import mongoose from 'mongoose';
import {cascadeDelete} from "../utilities/functions/misc";
const Cwimpie = require("./Cwimpie");

const HobbySchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
        }
    },
    {
        collection: "Hobbies"
    }
)

HobbySchema.post("deleteOne", { document: true, query: false },async function (hobby, next) {
    await cascadeDelete(Cwimpie, this, "hobbies");
})

module.exports = mongoose.model('Hobby', HobbySchema);