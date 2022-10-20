export {};
const express = require('express');

const auth = require('../middlewares/auth.mid');
const professionCtrl = require('../controllers/profession')

const professionRouter = express.Router();

professionRouter.get('/api/profession', auth, professionCtrl.getAllProfessions)
professionRouter.delete('/api/profession', auth, professionCtrl.deleteProfession)

module.exports = professionRouter