export class Cwimpie {
  cwimpieId?: string = "";
  name: string = "";
  sex?: string = "";
  birthdate?: string = "";
  colour?: Colour = new Colour();
  newColour?: Colour = new Colour();
  species?: Species = new Species();
  favourites?: Favourite[] = [];
  professions?: Profession[] = [];
  hobbies?: Hobby[] = [];
  primaryParent?: User = new User();
  partnerName?: string = "";
  stamp?: Stamp = new Stamp()
  dailyScheduleId?: DailySchedule[] = [];
  photo?: any;

  constructor() {
  }

}

export class Colour {
  _id?: string = "";
  name: string = "";
  hexCode?: string = "";
}

export class Species {
  _id?: string = "";
  name: string = "";
  type?: string = "";
  iconName?: string = "";
}

export class Favourite {
  _id?: string = "";
  name: string = "";
  type?: string = "";
}

export class Profession {
  _id?: string = "";
  name: string = "";
  type?: string = "";
  description?: string = "";
}

export class Hobby {
  _id?: string = "";
  name: string = "";
  description?: string = "";
}

export class Stamp {
  _id?: string = "";
  primary_colour?: Colour = new Colour();
  accent_colour?: Colour = new Colour();
  font?: string = "";
}

export class Country {

}

export class User {
  name?: string = "";
  id?: string = "";
  username?: string = "";
  token?: string = "";

  constructor() {
  }
}

export class Task {
  _id?: string = "";
  name?: string = "";
  description?: string = "";
  startTime?: string = "";
  endTime?: string = "";
  durationMinutes?: number = 0;
  isCompleted?: string = "";
  dailyScheduleId?: string = "";
}

export class DailySchedule {
  _id?: string = "";
  tasks?: Task[] = [];
  date?: string = "";
  cwimpieId?: string = ""
}
