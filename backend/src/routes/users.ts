export {};
const express = require('express');

const auth = require('../middlewares/auth.mid');
const userCtrl = require('../controllers/user')

const userRouter = express.Router();

userRouter.get('/api/users', auth, userCtrl.getAllUsers)
userRouter.get('/api/users/:username', auth, userCtrl.getUser)

module.exports = userRouter