import {ICountry} from "./modelInterfaces";

export interface INewUser {
    name: string,
    username: string,
    password: string,
    countryData: ICountry,
}