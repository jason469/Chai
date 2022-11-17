export {};
const express = require('express');

const auth = require('../middlewares/auth.mid');
const countryCtrl = require('../controllers/country')

const countryRouter = express.Router();

countryRouter.get('/api/country', auth, countryCtrl.getAllCountries)
countryRouter.post('/api/country', auth, countryCtrl.addCountry)
countryRouter.delete('/api/country', auth, countryCtrl.deleteCountry)

module.exports = countryRouter