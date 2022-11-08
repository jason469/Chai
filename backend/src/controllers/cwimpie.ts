import {Request, Response} from "express";
import {activityNames, cwimpieNames, favouriteNames} from "../utilities/randomValues/cwimpieValues";

const CwimpieService = require('../services/cwimpie')
const _ = require('lodash');

module.exports = class CwimpieController {
    static async getAllCwimpies(req: Request, res: Response) {
        try {
            const allCwimpies = await CwimpieService.getAllCwimpies();
            res.json(allCwimpies);
            return
        } catch (error) {
            res.status(500).json({error: error})
            return
        }
    }

    static async getCwimpie(req: Request, res: Response) {
        try {
            const cwimpie = await CwimpieService.getCwimpie(req.params.name);
            if (!cwimpie) {
                res.status(404).json(`${req.body.name} is sleeping!`)
                return
            }
            res.json({...cwimpie._doc});
            return
        } catch (error) {
            res.status(500).json({error: error})
            return
        }
    }

    static async addCwimpie(req: Request, res: Response) {
        try {
            console.log('add cwimpie data is ', req.body)
            const cwimpieData = req.body;

            let cwimpie = await CwimpieService.getCwimpie(cwimpieData.name);
            if (cwimpie) {
                res.status(400).json({msg: `${cwimpieData.name} already exists!`})
                return
            } else {
                await CwimpieService.createCwimpie(cwimpieData)
            }
            console.log(cwimpie)
            res.status(200).json({name: `${cwimpieData.name}`})
            return
        } catch (error) {
            res.status(500).json({msg: error})
            return
        }
    }

    static async updateCwimpie(req: Request, res: Response) {
        try {
            const updateCwimpieData = req.body;

            var cwimpie = await CwimpieService.getCwimpie(updateCwimpieData.name);
            if (!cwimpie) {
                res.status(400).json({msg: `${updateCwimpieData.name} doesn't exists!`})
                return
            } else {
                await CwimpieService.updateCwimpie(updateCwimpieData)
            }
            res.status(200).json({msg: `${updateCwimpieData.name} has been successfully updated`})
            return
        } catch (error) {
            res.status(500).json({msg: error});
            return
        }
    }

    static async deleteCwimpie(req: Request, res: Response) {
        try {
            await CwimpieService.deleteCwimpie(req.params.cwimpieName);
            res.status(200).json(`${req.params.cwimpieName} was deleted!`)
            return
        } catch (error) {
            res.status(500).json({error: error})
            return
        }
    }

    static async getRandomCwimpieValues(req: Request, res: Response) {
        try {
            let valueType = req.params.valueType;
            let randomValue = ""
            switch(valueType) {
                case "name":
                    randomValue = _.sample(cwimpieNames);
                    break
                case "favourites":
                    randomValue = _.sample(favouriteNames);
                    break
                case "professions":
                case "hobbies":
                    randomValue = _.sample(activityNames);
                    break
            }
            res.status(200).json(randomValue)
            return
        } catch (error) {
            res.status(500).json({error: error})
            return
        }
    }
};