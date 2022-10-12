import {Request, Response} from "express";
const express = require('express');

const auth = require('../middlewares/auth.mid');
const cwimpieCtrl = require('../controllers/cwimpie')

const cwimpieRouter = express.Router();

cwimpieRouter.get('/api/cwimpies', auth, cwimpieCtrl.getAllCwimpies)
cwimpieRouter.get('/api/cwimpies/getOne', auth, cwimpieCtrl.getCwimpie)
cwimpieRouter.post('/api/cwimpies/add', auth, cwimpieCtrl.addCwimpie)

module.exports = cwimpieRouter