import {Request, Response} from "express";

const UserService = require('../services/user')

module.exports = class UserController {
    static async getAllUsers(req: Request, res: Response) {
        console.log('get all')
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

    static async getUser(req: Request, res: Response) {
        try {
            const user = await UserService.getUser(req.params.username);
            if (!user) {
                res.status(404).json("There is no user with this username")
            }
            res.json(user);
            return
        } catch (error) {
            res.status(500).json({error: error})
            return
        }
    }
};