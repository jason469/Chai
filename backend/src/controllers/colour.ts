import {Request, Response} from "express";

const ColourService = require('../services/colour')

module.exports = class ColourController {
    static async getAllColours(req: Request, res: Response) {
        try {
            const allColours = await ColourService.getAllColours();
            console.log(allColours)
            if (allColours.length == 0) {
                res.status(404).json("There are no colours")
            }
            res.json(allColours);
        } catch (error) {
            res.status(500).json({error: error})
        }
    }


    static async deleteColour(req: Request, res: Response) {
        try {
            const colourName = req.body.name;
            await ColourService.deleteColour(colourName)
            await res.status(200).json({msg: `${colourName} has been successfully deleted`})
        } catch (error) {
            await res.status(500).json({msg: error})
        }
    }
};