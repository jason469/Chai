export interface IReducedCwimpieCardData {
  cwimpieId: string;
  name: string;
  birthdate: string,
  colour: IColour,
  species: ISpecies,
  favourites: IFavourite[],
  professions: IProfession[],
  hobbies: IHobby[],
  primary_parent: IUser
}

export interface IColour {
  _id: string
  name: string,
  hexCode: string
}

export interface ISpecies {
  _id: string,
  name: string,
  type: string,
  iconName: string
}

export interface IFavourite {
  _id: string
  name: string,
  type: string
}

export interface IProfession {
  _id: string
  name: string,
  type: string,
  description?: string,
}

export interface IHobby {
  _id: string
  name: string,
  description?: string,
}

export interface IStamp {
  _id: string
  name: string,
  primary_colour: IColour,
  accent_colour: IColour,
  font: string
}

export interface IUser {
  _id: string
  username: string,
  name?: string,
}

export interface ICountry {

}
