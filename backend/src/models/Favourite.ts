import mongoose from 'mongoose';
import {FavouriteChoices} from "../utilities/enums/model_enums";

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

module.exports = mongoose.model('Favourite', FavouriteSchema);