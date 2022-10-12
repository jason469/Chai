const CwimpieService = require('../services/cwimpie')

import {Request, Response} from "express";

module.exports = class CwimpieController {
    static async getAllCwimpies(req: Request, res: Response) {
        try {
            const allCwimpies = await CwimpieService.getAllCwimpies();
            console.log(allCwimpies)
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
            console.log(cwimpie)
            if (!cwimpie) {
                res.status(404).json("This cwimpie is sleeping!")
            }
            res.json({...cwimpie});
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static async addCwimpie(req: Request, res: Response) {
        try {
            const cwimpieData = req.body;

            var cwimpie = await CwimpieService.getCwimpie(cwimpieData.name);
            if (cwimpie) {
                res.status(400).json("This cwimpie already exists !")
            } else {
                cwimpie = CwimpieService.createCwimpie(cwimpieData)
            }
            res.json({...cwimpie});
        } catch (error) {
            res.status(500).json({error: error})
        }
    }
};