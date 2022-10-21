import {Request, Response} from "express";

const ProfessionService = require('../services/profession')

module.exports = class ProfessionController {
    static async getAllProfessions(req: Request, res: Response) {
        try {
            const allProfessions = await ProfessionService.getAllProfessions();
            if (allProfessions.length == 0) {
                res.status(404).json("There are no professions")
            }
            res.json(allProfessions);
            return
        } catch (error) {
            res.status(500).json({error: error})
            return
        }
    }


    static async deleteProfession(req: Request, res: Response) {
        try {
            const professionName = req.body.name;
            await ProfessionService.deleteProfession(professionName)
            await res.status(200).json({msg: `${professionName} has been successfully deleted`})
            return
        } catch (error) {
            await res.status(500).json({msg: error})
            return
        }
    }
};