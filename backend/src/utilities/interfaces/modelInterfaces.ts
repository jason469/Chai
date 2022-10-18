export interface IColour {
    name: string,
    hexCode?: string
}

export interface ISpecies {
    name: string,
    type: string
}

export interface IFavourite {
    name: string,
    type: string
}

export interface IProfession {
    name: string,
    type: string,
    description ?: string,
}

export interface IHobby {
    name: string,
    description ?: string,
}

export interface IStamp {
    name: string,
    primary_colour: IColour,
    accent_colour: IColour,
    font: string
}

export interface IUser {
    username: string,
    name?: string,
}

export interface ICountry {

}