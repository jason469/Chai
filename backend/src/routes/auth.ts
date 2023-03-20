export {};
const express = require('express');
const auth = require('../middlewares/auth.mid');

const authCtrl = require('../controllers/auth')


const authRouter = express.Router();

authRouter.get('/', auth, authCtrl.getUser)
authRouter.post('/api/signup', authCtrl.signUp)
authRouter.post('/api/login', authCtrl.login)
authRouter.post('/api/token/tokenIsValid', authCtrl.checkTokenIsValid);

module.exports = authRouter