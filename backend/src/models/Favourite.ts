import mongoose from 'mongoose';
import {FavouriteChoices} from "../utilities/enums/modelEnums";
import {cascadeDelete} from "../utilities/functions/misc";
const Cwimpie = require("./Cwimpie");

const FavouriteSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        type: {
            type: String,
            required: true,
            enum: Object.values(FavouriteChoices),
            default: FavouriteChoices.Food
        }
    },
    {
        collection: "Favourites"
    }
)

FavouriteSchema.post("deleteOne", { document: true, query: false },async function (favourite, next) {
    await cascadeDelete(Cwimpie, this, "favourites");
})


module.exports = mongoose.model('Favourite', FavouriteSchema);