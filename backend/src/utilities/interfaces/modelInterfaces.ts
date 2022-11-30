export interface ICwimpie {
    name: string,
    photo?: string,
    birthdate: Date,
    partnerId: ICwimpie,
    dailyScheduleId: IDailySchedule[],
    colourId: IColour,
    speciesId: ISpecies,
    favourites: IFavourite[],
    professions: IProfession[],
    hobbies: IHobby[],
    primaryParentId: IUser,
    stampId: IStamp
}

export interface IColour {
    name: string,
    hexCode?: string
}

export interface ISpecies {
    name: string,
    type: string,
    iconName: string
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
    primary_colour: IColour,
    accent_colour: IColour,
    font: string
}

export interface IUser {
    username?: string,
    name?: string,
}

export interface ICountry {
    name: string,
    coordinates?: coordinates[]
}

export interface IDailySchedule {
    date: string,
    cwimpieId: string,
    tasks?: ITask[],
}

export interface ITask {
    name: string, 
    description: string, 
    startTime: Date,
    endTime: Date,
    durationMinutes: Number,
    isCompleted: boolean,
    dailyScheduleId: IDailySchedule
}

type coordinates = number[]