export {};
const express = require('express');

const auth = require('../middlewares/auth.mid');
const professionCtrl = require('../controllers/profession')

const professionRouter = express.Router();

professionRouter.get('/api/profession', auth, professionCtrl.getAllProfessions)
professionRouter.get('/api/profession-types', auth, professionCtrl.getProfessionTypes)
professionRouter.delete('/api/profession', auth, professionCtrl.deleteProfession)

module.exports = professionRouter