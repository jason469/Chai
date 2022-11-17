import {ICountry} from "../utilities/interfaces/modelInterfaces";

const Country = require('../models/Country')

module.exports = class CountryService {
    static async getAllCountries() {
        try {
            return await Country.find();
        } catch (error) {
            console.log(`Could not fetch countries ${error}`)
        }
    }

    static async getOrCreateCountry(data: ICountry) {
        try {
            let country = await Country.find({
                name: data.name
            });
            if (!country) {
                let country = new Country({
                    name: data.name,
                    coordinates: data.coordinates
                })
                await country.save()
                return country
            }
        } catch (error) {
            console.log(`Could not fetch country ${error}`)
        }
    }

    static async deleteCountry(name: string) {
        try {
            await Country.findOneAndDelete({"name": name});
            return true
        } catch (error) {
            console.log(`Could not delete country ${error}`)
            return false
        }
    }
}