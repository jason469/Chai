export {};
const express = require('express');

const auth = require('../middlewares/auth.mid');
const hobbyCtrl = require('../controllers/hobby')

const hobbyRouter = express.Router();

hobbyRouter.get('/api/hobbies', auth, hobbyCtrl.getAllHobbies)
hobbyRouter.delete('/api/hobbies', auth, hobbyCtrl.deleteHobby)

module.exports = hobbyRouter