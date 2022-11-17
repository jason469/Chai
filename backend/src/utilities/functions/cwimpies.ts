import {IColour, IFavourite, IHobby, IProfession, ISpecies, IStamp, IUser} from "../interfaces/modelInterfaces";

const colourService = require('../../services/colour')
const speciesService = require('../../services/species')
const favouriteService = require('../../services/favourite')
const professionService = require('../../services/profession')
const hobbyService = require('../../services/hobby')
const stampService = require('../../services/stamp')
const userService = require('../../services/user')
const cwimpieService = require('../../services/cwimpie')
import {TNewPropertyValue} from "../interfaces/cwimpieInterfaces"

export function getCwimpieProperty(object:Object, propertyName:string,
                                      newPropertyValue:TNewPropertyValue) {
    type ObjectKey = keyof typeof object;
    const property = propertyName as ObjectKey;
    if (object[property] !== undefined) {
        switch (propertyName) {
            case "name":
            case "photo":
            case "birthdate":
                return newPropertyValue
            case "partnerId":
                return cwimpieService.getCwimpie(<string> newPropertyValue)
            case "colourId":
                return colourService.getColourOrCreate(<IColour> newPropertyValue)
            case "speciesId":
                return speciesService.getSpeciesOrCreate(<ISpecies>newPropertyValue)
            case "favourites":
                return favouriteService.getFavouriteOrCreate(<IFavourite>newPropertyValue)
            case "professions":
                return professionService.getProfessionOrCreate(<IProfession>newPropertyValue)
            case "hobbies":
                return hobbyService.getHobbyOrCreate(<IHobby>newPropertyValue)
            case "primaryParentId":
                return userService.getUser(<IUser>newPropertyValue)
            case "stampId":
                return stampService.getStampOrCreate(<IStamp>newPropertyValue)
        }
    }
}