import {Request, Response} from "express";
import {activityNames, cwimpieNames, favouriteNames} from "../utilities/randomValues/cwimpieValues";
const upload = require("../middlewares/upload.mid");

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
            const cwimpieData = req.body;

            let cwimpie = await CwimpieService.getCwimpie(cwimpieData.name);
            if (cwimpie) {
                res.status(400).json({msg: `${cwimpieData.name} already exists!`})
                return
            } else {
                await CwimpieService.createCwimpie(cwimpieData)
            }
            res.status(200).json({name: `${cwimpieData.name}`})
            return
        } catch (error) {
            res.status(500).json({msg: error})
            return
        }
    }

    static async addCwimpiePhoto(req: Request, res: Response) {
        try {
            const url = req.protocol + '://' + req.get('host')
            const photoName = req.file?.filename
            const cwimpieName = req.params.cwimpieName
            let cwimpie = await CwimpieService.getCwimpie(cwimpieName);
            if (cwimpie) {
                cwimpie.photo = url + '/public/media/' + photoName
                cwimpie.save()
                res.status(200).json({msg: `${cwimpieName} now has a photo!`})
                return
            } else {
                res.status(400).json({msg: `${cwimpieName} doesnt exist!`})
                return
            }
        } catch (error) {
            res.status(500).json({msg: error})
            return
        }
    }

    static async updateCwimpie(req: Request, res: Response) {
        try {
            const updateCwimpieData = req.body;
            let cwimpie = await CwimpieService.getCwimpie(req.params.cwimpieName);
            if (!cwimpie) {
                res.status(400).json({msg: `${updateCwimpieData.name} doesn't exists!`})
                return
            } else {
                await CwimpieService.updateCwimpie(cwimpie, updateCwimpieData)
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