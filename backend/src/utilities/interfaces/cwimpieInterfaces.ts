import {IColour, ICountry, IFavourite, IHobby, IProfession, ISpecies, IStamp, IUser} from "./modelInterfaces";

export interface INewCwimpieData {
    name: string,
    colour: IColour,
    species: ISpecies,
    user?: string,
    token?: string,
    birthdate: string,
    favourites: IFavourite[],
    professions: IProfession[],
    hobbies: IHobby[],
    stamp: IStamp,
    primaryParent: IUser,
    partner_name?: string,
}

export interface IUpdateCwimpieData {
    name: string
    property: string,
    data?: any
}

export type TNewPropertyValue = IColour | ISpecies | IFavourite | IProfession | IHobby | IStamp | ICountry | string