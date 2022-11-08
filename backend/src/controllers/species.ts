import {Request, Response} from "express";

const SpeciesService = require('../services/species')

module.exports = class SpeciesController {
    static async getAllSpecies(req: Request, res: Response) {
        try {
            const allSpecies = await SpeciesService.getAllSpecies();
            if (allSpecies.length == 0) {
                res.status(404).json("There are no species")
                return
            }
            res.json(allSpecies);
            return
        } catch (error) {
            res.status(500).json({error: error})
            return
        }
    }


    static async deleteSpecies(req: Request, res: Response) {
        try {
            const speciesName = req.body.name;
            await SpeciesService.deleteSpecies(speciesName)
            await res.status(200).json({msg: `${speciesName} has been successfully deleted`})
            return
        } catch (error) {
            await res.status(500).json({msg: error})
            return
        }
    }
};