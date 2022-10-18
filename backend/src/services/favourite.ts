import {IFavourite} from "../utilities/interfaces/modelInterfaces";
import {FavouriteChoices} from "../utilities/enums/modelEnums";
import {getValueFromEnumWithKey} from "../utilities/functions/misc";

const Favourite = require('../models/Favourite')

module.exports = class FavouriteService {
    static async getAllFavourites() {
        try {
            const allFavourites = await Favourite.find();
            return allFavourites;
        } catch (error) {
            console.log(`Could not fetch favourites ${error}`)
        }
    }

    static async getFavouriteOrCreate(data: IFavourite) {
        try {
            var favourite = await Favourite.findOne({name: data.name, type: data.type});
            if (!favourite) {
                favourite = new Favourite({
                    name: data.name,
                    type: getValueFromEnumWithKey(FavouriteChoices, data.type)
                })
                await favourite.save()
            }
            return favourite
        } catch (error) {
            console.log(`Could not fetch favourite ${error}`)
        }
    }
}