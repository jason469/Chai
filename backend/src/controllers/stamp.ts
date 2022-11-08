import {Request, Response} from "express";

const StampService = require('../services/stamp')

module.exports = class StampController {
    static async getAllStamps(req: Request, res: Response) {
        try {
            const allStamps = await StampService.getAllStamps();
            if (allStamps.length == 0) {
                res.status(404).json("There are no stamps")
            }
            res.json(allStamps);
            return
        } catch (error) {
            res.status(500).json({error: error})
            return
        }
    }


    static async deleteStamp(req: Request, res: Response) {
        try {
            const stampName = req.body.name;
            await StampService.deleteColour(stampName)
            await res.status(200).json({msg: `${stampName} has been successfully deleted`})
            return
        } catch (error) {
            await res.status(500).json({msg: error})
            return
        }
    }

    static async getAllFonts(req: Request, res: Response) {
        try {
            const allFonts = await StampService.getAllFonts();
            if (allFonts.length == 0) {
                res.status(404).json("There are no fonts")
            }
            res.json(allFonts);
            return
        } catch (error) {
            res.status(500).json({error: error})
            return
        }
    }
};