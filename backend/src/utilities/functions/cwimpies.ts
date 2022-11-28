import {IColour, IFavourite, IHobby, IProfession, ISpecies, IStamp, IUser} from "../interfaces/modelInterfaces";
import {TNewPropertyValue} from "../interfaces/cwimpieInterfaces"

const colourService = require('../../services/colour')
const speciesService = require('../../services/species')
const favouriteService = require('../../services/favourite')
const professionService = require('../../services/profession')
const hobbyService = require('../../services/hobby')
const stampService = require('../../services/stamp')
const userService = require('../../services/user')
const cwimpieService = require('../../services/cwimpie')

export async function getCwimpieProperty(propertyName: string, newPropertyValue: TNewPropertyValue) {
    switch (propertyName) {
        case "name":
        case "photo":
        case "birthdate":
            return newPropertyValue
        case "partnerName":
            if (newPropertyValue === "") {
                return ""
            } else {
                let cwimpie = await cwimpieService.getCwimpie(<string>newPropertyValue)
                console.log('cwimpie', cwimpie)
                return cwimpie.name
            }
        case "colour":
            return await colourService.getColourOrCreate(<IColour>newPropertyValue)
        case "species":
            return await speciesService.getSpeciesOrCreate(<ISpecies>newPropertyValue)
        case "favourites":
            return await favouriteService.getFavouriteOrCreate(<IFavourite>newPropertyValue)
        case "professions":
            return await professionService.getProfessionOrCreate(<IProfession>newPropertyValue)
        case "hobbies":
            return await hobbyService.getHobbyOrCreate(<IHobby>newPropertyValue)
        case "primaryParent":
            return await userService.getUser(<IUser>newPropertyValue)
        case "stamp":
            console.log('stamp')
            return await stampService.getStampOrCreate(<IStamp>newPropertyValue)
    }
}