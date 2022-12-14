export {};
const express = require('express');
const upload = require('../middlewares/upload.mid');
const auth = require('../middlewares/auth.mid');

const cwimpieRouter = express.Router();
const cwimpieCtrl = require('../controllers/cwimpie')


cwimpieRouter.get('/api/cwimpies', auth, cwimpieCtrl.getAllCwimpies)
cwimpieRouter.get('/api/cwimpies/user/:username', auth, cwimpieCtrl.getAllCwimpiesFromUser)
cwimpieRouter.get('/api/cwimpies/birthdays', auth, cwimpieCtrl.getBirthdayCwimpies)
cwimpieRouter.get('/api/cwimpies/cwimpie-name/:name', auth, cwimpieCtrl.getCwimpie)
cwimpieRouter.get('/api/cwimpies/random-values/:valueType', auth, cwimpieCtrl.getRandomCwimpieValues)
cwimpieRouter.post('/api/cwimpies/add', auth, cwimpieCtrl.addCwimpie)
cwimpieRouter.post('/api/cwimpies/add-photo/:cwimpieName', auth, upload.single('photo'), cwimpieCtrl.addCwimpiePhoto)
cwimpieRouter.patch('/api/cwimpies/update/:cwimpieName', auth, cwimpieCtrl.updateCwimpie)
cwimpieRouter.delete('/api/cwimpies/delete/:cwimpieName', auth, cwimpieCtrl.deleteCwimpie)

module.exports = cwimpieRouter