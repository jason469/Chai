import {Request, Response} from "express";

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User')

const UserService = require('../services/user')


module.exports = class AuthController {
    static async getUser(req: Request, res: Response) {
        try {
            const user = await UserService.getUser(req.body.user);
            if (user) {
                res.json({...user._doc, token: req.body.token})
                return
            } else {
                res.json("No user found")
                return
            }
        } catch (e: any) {
            return res.status(500).json({error: e.message})
        }
    }


    static async signUp(req: Request, res: Response) {
        try {
            let requestData = req.body
            const userData = {
                name: requestData.name,
                username: requestData.username,
                password: requestData.password,
                countryData: requestData.countryData
            }
            const user = await UserService.getOrCreateUser(userData)

            if (user == "New user was created") {
                res.status(200).json({msg: `${requestData.name} was created`});
                return
            } else if (user == "This user already exists") {
                res.status(400).json({msg: 'There is already a user with that username!'});
                return
            } else {
                res.status(500).json({msg: 'The user couldnt be created'});
                return
            }
        } catch (e: any) {
            res.status(500).json({error: e.message})
            return
        }
    }


    static async login(req: Request, res: Response) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if (!user) {
                res
                    .status(400)
                    .json({msg: 'User with this username doesnt exist'});
                return
            }
            const isMatch = await bcryptjs.compare(password, user.password);
            if (!isMatch) {
                res
                    .status(400)
                    .json({msg: 'Incorrect password'});
                return
            }

            const token = jwt.sign({id: user._id}, "passwordKey", {expiresIn: "100 days"});
            res.json({token, ...user._doc})
        } catch (e: any) {
            console.log(e)
            res.status(500).json({error: e.message})
            return
        }
        return
    }

    static async checkTokenIsValid(req: Request, res: Response) {
        try {
            const token = req.body.token;
            if (!token) return res.json(false);
            const isVerified = jwt.verify(token, "passwordKey");
            if (!isVerified) return res.json(false);

            const user = await User.findById(isVerified.id);
            if (!user) return res.json(false);
            console.log('successful')
            res.json(true)
            return
        } catch (e: any) {
            res.status(500).json({error: e.message})
            return
        }
    }
};