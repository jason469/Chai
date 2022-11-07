export {};
const express = require('express');

const auth = require('../middlewares/auth.mid');
const cwimpieCtrl = require('../controllers/cwimpie')

const cwimpieRouter = express.Router();

cwimpieRouter.get('/api/cwimpies', auth, cwimpieCtrl.getAllCwimpies)
cwimpieRouter.get('/api/cwimpies/getOne', auth, cwimpieCtrl.getCwimpie)
cwimpieRouter.get('/api/cwimpies/random-values/:valueType', auth, cwimpieCtrl.getRandomCwimpieValues)
cwimpieRouter.post('/api/cwimpies/add', auth, cwimpieCtrl.addCwimpie)
cwimpieRouter.patch('/api/cwimpies/update', auth, cwimpieCtrl.updateCwimpie)
cwimpieRouter.delete('/api/cwimpies/:cwimpieName', auth, cwimpieCtrl.deleteCwimpie)

module.exports = cwimpieRouter