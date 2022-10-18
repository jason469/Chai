export {};
const express = require('express');

const auth = require('../middlewares/auth.mid');
const colourCtrl = require('../controllers/colour')

const colourRouter = express.Router();

colourRouter.get('/api/colours', auth, colourCtrl.getAllColours)
colourRouter.delete('/api/colours', auth, colourCtrl.deleteColour)

module.exports = colourRouter