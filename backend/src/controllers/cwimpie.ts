import {Request, Response} from "express";

const CwimpieService = require('../services/cwimpie')

module.exports = class CwimpieController {
    static async getAllCwimpies(req: Request, res: Response) {
        try {
            const allCwimpies = await CwimpieService.getAllCwimpies();
            if (allCwimpies.length == 0) {
                res.status(404).json("The cwimpies are snoozing :( Check later!")
            }
            res.json(allCwimpies);
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static async getCwimpie(req: Request, res: Response) {
        try {
            const cwimpie = await CwimpieService.getCwimpie(req.body.name);
            if (!cwimpie) {
                await res.status(404).json(`${req.body.name} is sleeping!`)
            }
            await res.json({...cwimpie._doc});
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static async addCwimpie(req: Request, res: Response) {
        try {
            const cwimpieData = req.body;

            var cwimpie = await CwimpieService.getCwimpie(cwimpieData.name);
            if (cwimpie) {
                await res.status(400).json({msg: `${cwimpieData.name} already exists!`})
            } else {
                await CwimpieService.createCwimpie(cwimpieData)
            }
            await res.status(200).json({msg: `${cwimpieData.name} has been successfully created`})
        } catch (error) {
            await res.status(500).json({msg: error})
        }
    }

    static async updateCwimpie(req: Request, res: Response) {
        try {
            const updateCwimpieData = req.body;

            var cwimpie = await CwimpieService.getCwimpie(updateCwimpieData.name);
            if (!cwimpie) {
                await res.status(400).json({msg: `${updateCwimpieData.name} doesn't exists!`})
            } else {
                await CwimpieService.updateCwimpie(updateCwimpieData)
            }
            await res.status(200).json({msg: `${updateCwimpieData.name} has been successfully updated`})
        } catch (error) {
            await res.status(500).json({msg: error})
        }
    }
};