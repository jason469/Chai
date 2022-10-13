import {IColour, IFavourite, IHobby, IProfession, ISpecies, IStamp, IUser} from "./modelInterfaces";

export interface INewCwimpieData {
    name: string,
    colour: IColour,
    species: ISpecies,
    user ?: string,
    token ?: string,
    birthdate: string,
    favourites: IFavourite[],
    professions: IProfession[],
    hobbies: IHobby[],
    stamp: IStamp,
    primary_parent: IUser,
    partner_name?: string,
}