export {};
const express = require('express');

const auth = require('../middlewares/auth.mid');
const speciesCtrl = require('../controllers/species')

const speciesRouter = express.Router();

speciesRouter.get('/api/hobbies', auth, speciesCtrl.getAllSpecies)
speciesRouter.delete('/api/hobbies', auth, speciesCtrl.deleteSpecies)

module.exports = speciesRouter