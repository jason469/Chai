import {Request, Response} from "express";

const CwimpieService = require('../services/cwimpie')

module.exports = class CwimpieController {
    static async getAllCwimpies(req: Request, res: Response) {
        try {
            const allCwimpies = await CwimpieService.getAllCwimpies();
            if (allCwimpies.length == 0) {
                res.status(404).json("The cwimpies are snoozing :( Check later!")
                return
            }
            res.json(allCwimpies);
            return
        } catch (error) {
            res.status(500).json({error: error})
            return
        }
    }

    static async getCwimpie(req: Request, res: Response) {
        try {
            const cwimpie = await CwimpieService.getCwimpie(req.body.name);
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

            var cwimpie = await CwimpieService.getCwimpie(cwimpieData.name);
            if (cwimpie) {
                res.status(400).json({msg: `${cwimpieData.name} already exists!`})
                return
            } else {
                await CwimpieService.createCwimpie(cwimpieData)
            }
            res.status(200).json({msg: `${cwimpieData.name} has been successfully created`})
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
};