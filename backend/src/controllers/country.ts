import {Request, Response} from "express";
import {ICountry} from "../utilities/interfaces/modelInterfaces";

const CountryService = require('../services/country')

module.exports = class CountryController {
    static async getAllCountries(req: Request, res: Response) {
        try {
            const allCountries = await CountryService.getAllCountries();
            if (allCountries.length == 0) {
                res.status(404).json("There are no countries")
                return
            }
            res.json(allCountries);
            return
        } catch (error) {
            res.status(500).json({error: error})
            return
        }
    }

    static async addCountry(req: Request, res: Response) {
        try {
            const countryData:ICountry = req.body
            const country = await CountryService.getOrCreateCountry(countryData);
            res.status(200).json(`${country.name} was successfully created`);
            return
        } catch (error) {
            res.status(500).json({error: error})
            return
        }
    }


    static async deleteCountry(req: Request, res: Response) {
        try {
            const countryData:ICountry = req.body.countryData
            await CountryService.deleteCountry(countryData.name)
            await res.status(200).json({msg: `${countryData.name} has been successfully deleted`})
            return
        } catch (error) {
            await res.status(500).json({msg: error})
            return
        }
    }
};