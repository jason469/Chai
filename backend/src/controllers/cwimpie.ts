import {Request, Response} from "express";
import {activityNames, cwimpieNames, favouriteNames} from "../utilities/randomValues/cwimpieValues";
import {allCwimpiesCache} from "../config/caches/allCaches";

const CwimpieService = require('../services/cwimpie')
const _ = require('lodash');
const Cwimpie = require("../models/Cwimpie");

module.exports = class CwimpieController {
    static async getAllCwimpies(req: Request, res: Response) {
        try {
            let allCwimpies = []
            let allCwimpiesCacheKeys = await allCwimpiesCache.getAllKeys()
            let allCwimpiesDatabaseCount = await Cwimpie.countDocuments()

            if (allCwimpiesCacheKeys.length == allCwimpiesDatabaseCount) {  // Assume cache is correct
                for (let cwimpieName of allCwimpiesCacheKeys) {
                    let cwimpieData = JSON.parse(await allCwimpiesCache.getValueByKey(cwimpieName, true))
                    allCwimpies.push(cwimpieData)
                }
            } else {
                allCwimpies = await CwimpieService.getAllCwimpies();
                for (let cwimpie of allCwimpies) {
                    await allCwimpiesCache.setValueByKey(cwimpie.name, cwimpie)
                }
            }
            res.json(allCwimpies);
            return
        } catch (error) {
            res.status(500).json({error: error})
            return
        }
    }

    static async getAllCwimpiesFromUser(req: Request, res: Response) {
        try {
            const allCwimpies = await CwimpieService.getAllCwimpiesFromUser(req.params.username);
            res.json(allCwimpies);
            return
        } catch (error) {
            res.status(500).json({error: error})
            return
        }
    }

    static async getCwimpie(req: Request, res: Response) {
        try {
            let cwimpie;
            let cwimpieResponse;

            cwimpie = JSON.parse(await(allCwimpiesCache.getValueByKey(req.params.name)))
            cwimpieResponse = cwimpie
            if (!cwimpie) {
                cwimpie = await CwimpieService.getCwimpie(req.params.name);
                if (cwimpie) {
                    await allCwimpiesCache.setValueByKey(cwimpie.name, {...cwimpie._doc})
                    cwimpieResponse = {...cwimpie._doc}
                } else {
                    res.status(404).json(`${req.body.name} is sleeping!`)
                    return
                }
            }
            res.json(cwimpieResponse);
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
            if (photoName != undefined) {
                const addPhotoSuccess = await CwimpieService.addCwimpiePhoto(url, photoName, cwimpieName)
                if (addPhotoSuccess) {
                    res.status(200).json({msg: `${cwimpieName} now has a photo!`})
                    return
                } else {
                    res.status(400).json({msg: `${cwimpieName} doesnt exist!`})
                    return
                }
            } else {
                res.status(200).json({msg: `${cwimpieName} has kept its old photo!`})
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
            switch (valueType) {
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

    static async getBirthdayCwimpies(req: Request, res: Response) {
        let birthdayCwimpies:typeof Cwimpie[] = []
        try {
            let nzst = new Date(new Date().toLocaleString("en-US", {timeZone: "Pacific/Auckland"}))
            let midnightNzst = new Date(nzst.setHours(0,0,0,0))

            let midnightDateMonth = midnightNzst.getMonth()
            let midnightDateDay = midnightNzst.getDate()

            const allCwimpies = await CwimpieService.getAllCwimpies();
            for (let cwimpie of allCwimpies) {
                let nzstDateString = new Date(new Date(cwimpie.birthdate).toLocaleString("en-US", {timeZone: "Pacific/Auckland"}))
                let nzstDate = new Date(nzstDateString)

                let birthdayMonth = nzstDate.getMonth()
                let birthdayDay = nzstDate.getDate()

                if (birthdayDay == midnightDateDay && birthdayMonth == midnightDateMonth) {
                    birthdayCwimpies.push(cwimpie)
                }
            }
            res.status(200).json(birthdayCwimpies)
            return
        } catch (error) {
            res.status(500).json({error: error})
            return
        }
    }
};