export class Cwimpie {
  constructor(
    private name: string,
    private photo: string,
    private birthdate: string,
    private partnerName: string,
    private colour: {
      "name": string
    },
    private species: {
      "name": string
    },
    private primaryParent: {
      "name": string
    },
    private favourites: [{
      "name": string
    }],
    private professions: [{
      "name": string
    }],
    private hobbies: [{
      "name": string
    }],
  ) {
  }
}
