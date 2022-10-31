export class Cwimpie {
  name?: string;
  photo?: object;
  birthdate?: string;
  partnerName?: string;
  colour?: {
    "name": string;
    "hexCode": string
  };
  species?: {
    "name": string
  };
  primaryParent?: {
    "name": string
  };
  favourites?: [{
    "name": string
  }];
  professions?: [{
    "name": string
  }];
  hobbies?: [{
    "name": string
  }];

  constructor() {
  }

}
