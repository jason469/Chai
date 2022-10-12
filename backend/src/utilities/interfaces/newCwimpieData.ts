import {IColour, IFavourite, IHobby, IProfession, ISpecies} from "./modelInterfaces";

export interface INewCwimpieData {
    name: String,
    colour: IColour,
    species: ISpecies,
    user ?: String,
    token ?: String,
    // birthdate: String,
    favourites: IFavourite[],
    professions: IProfession[],
    hobbies: IHobby[],
    partner_name?: String,
}