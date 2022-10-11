import {Request, Response} from "express";

const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth.mid');
const User = require('../models/User')

const authRouter = express.Router();

authRouter.get('/', auth, async (req: Request, res:Response) => {
    const user = await User.findById(req.body.user);
    res.json({...user._doc, token: req.body.token})
})

authRouter.post('/api/users/signup', async (req: Request, res: Response) => {
    try {
        const {
            name,
            username,
            password
        } = req.body;

        const existingUser = await User.findOne({username});
        if (existingUser) {
            return res.status(400).json({msg: 'There is already a user with that username!'});
        }

        const hashedPassword = await bcryptjs.hash(password, 8);

        let user = new User({
            username,
            password: hashedPassword,
            name,
        })
        user = await user.save()
        res.json(user);
    } catch (e:any) {
        return res.status(500).json({error: e.message})
    }
})

authRouter.post('/api/users/login', async (req: Request, res: Response) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if (!user) {
            return res
                .status(400)
                .json({msg: 'User with this username doesnt exist'});
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({msg: 'Incorrect password'});
        }

        const token = jwt.sign({id: user._id}, "passwordKey", {expiresIn: "100 days"});
        console.log(token)
        res.json({token, ...user._doc})
    } catch (e:any) {
        console.log(e)
        return res.status(500).json({error: e.message})
    }
})

authRouter.post('/api/token/tokenIsValid', async (req: Request, res: Response) => {
    try {
        console.log('token is valid route')
        const token = req.body.token;
        if (!token) return res.json(false);
        const isVerified = jwt.verify(token, "passwordKey");
        if (!isVerified) return res.json(false);
        console.log('verified')

        const user = await User.findById(isVerified.id);
        console.log(user)
        if (!user) return res.json(false);
        res.json(true)
    } catch (e:any) {
        return res.status(500).json({error: e.message})
    }
});

module.exports = authRouter