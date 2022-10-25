import {Request, Response} from "express";

const UserService = require('../services/user')

module.exports = class UserController {
    static async getAllUsers(req: Request, res: Response) {
        try {
            const allUsers = await UserService.getAllUsers();
            if (allUsers.length == 0) {
                res.status(404).json("There are no users")
            }
            res.json(allUsers);
            return
        } catch (error) {
            res.status(500).json({error: error})
            return
        }
    }
};