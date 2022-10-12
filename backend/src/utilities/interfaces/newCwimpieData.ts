import {IColour, ISpecies} from "./modelInterfaces";

export interface INewCwimpieData {
    name: String,
    colour: IColour,
    species: ISpecies,
    user ?: String,
    token ?: String,
    // birthdate: String,
    // favouriteFood: IFavourite,
    partner_name?: String,
}