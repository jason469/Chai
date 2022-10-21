import {Request, Response} from "express";

const HobbyService = require('../services/hobby')

module.exports = class HobbyController {
    static async getAllHobbies(req: Request, res: Response) {
        try {
            const allHobbies = await HobbyService.getAllHobbies();
            if (allHobbies.length == 0) {
                res.status(404).json("There are no hobbies")
            }
            res.json(allHobbies);
            return
        } catch (error) {
            res.status(500).json({error: error})
            return
        }
    }


    static async deleteHobby(req: Request, res: Response) {
        try {
            const hobbyName = req.body.name;
            await HobbyService.deleteHobby(hobbyName)
            await res.status(200).json({msg: `${hobbyName} has been successfully deleted`})
            return
        } catch (error) {
            await res.status(500).json({msg: error})
            return
        }
    }
};