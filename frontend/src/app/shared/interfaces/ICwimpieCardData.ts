export class ICwimpieCardData {
  cwimpieId: string = "";
  name: string = "";
  birthdate: string = "";
  colour: IColour = new IColour();
  species: ISpecies = new ISpecies();
  favourites: IFavourite[] =[];
  professions: IProfession[] = [];
  hobbies: IHobby[] = [];
  primaryParent: IUser = new IUser();
}

export class IColour {
  _id: string = "";
  name: string = "";
  hexCode: string = "";
}

export class ISpecies {
  _id: string = "";
  name: string = "";
  type: string = "";
  iconName: string = "";
}

export class IFavourite {
  _id: string = "";
  name: string = "";
  type: string = "";
}

export class IProfession {
  _id: string = "";
  name: string = "";
  type: string = "";
  description?: string = "";
}

export class IHobby {
  _id: string = "";
  name: string = "";
  description?: string = "";
}

export class IStamp {
  _id: string = "";
  name: string = "";
  primary_colour: IColour = new IColour();
  accent_colour: IColour = new IColour();
  font: string = "";
}

export class IUser {
  _id: string = "";
  username: string = "";
  name?: string = "";
}

export class ICountry {

}
