import {IColour, IFavourite, IHobby, IProfession, ISpecies, IStamp} from "./modelInterfaces";

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
    stamp: IStamp,
    partner_name?: String,
}