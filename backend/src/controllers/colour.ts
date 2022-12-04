import {Request, Response} from "express";
import {allColoursCache, allCwimpiesCache} from "../config/caches/allCaches";
const Colour = require("../models/Colours");

const ColourService = require('../services/colour')

module.exports = class ColourController {
    static async getAllColours(req: Request, res: Response) {
        try {
            let allColours = []
            let allColoursCacheKeys = await allColoursCache.getAllKeys()
            let allColoursDatabaseCount = await Colour.countDocuments()

            if (allColoursCacheKeys.length == allColoursDatabaseCount) {  // Assume cache is correct
                for (let colourName of allColoursCacheKeys) {
                    let colourData = JSON.parse(await allColoursCache.getValueByKey(colourName, true))
                    allColours.push(colourData)
                }
            } else {
                allColours = await ColourService.getAllColours();
                for (let colour of allColours) {
                    await allColoursCache.setValueByKey(colour.name, colour)
                }
            }

            if (allColours.length == 0) {
                res.status(404).json("There are no colours")
                return
            }
            res.json(allColours);
            return
        } catch (error) {
            res.status(500).json({error: error})
            return
        }
    }


    static async deleteColour(req: Request, res: Response) {
        try {
            const colourName = req.body.name;
            await ColourService.deleteColour(colourName)
            await res.status(200).json({msg: `${colourName} has been successfully deleted`})
            return
        } catch (error) {
            await res.status(500).json({msg: error})
            return
        }
    }
};