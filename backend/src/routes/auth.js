const express = require('express');
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth.mid');

const authRouter = express.Router();

authRouter.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({...user._doc, token: req.token})
})

authRouter.post('/api/users/signup', async (req, res) => {
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
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
})

authRouter.post('/api/users/login', async (req, res) => {
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
        res.json({token, ...user}.lean())
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
})

authRouter.post('/api/token/tokenIsValid', async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) return res.json(false);
        const isVerified = jwt.verify(token, "passwordKey");
        if (!isVerified) return res.json(false);

        const user = await User.findById(isVerified.id);
        if (!user) return res.json(false);
        res.json(true)

    } catch (e) {
        return res.status(500).json({error: e.message})
    }
});

module.exports = authRouter