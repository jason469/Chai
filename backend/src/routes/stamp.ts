export {};
const express = require('express');

const auth = require('../middlewares/auth.mid');
const stampCtrl = require('../controllers/stamp')

const stampRouter = express.Router();

stampRouter.get('/api/stamps', auth, stampCtrl.getAllStamps)
stampRouter.delete('/api/stamps', auth, stampCtrl.deleteStamp)

module.exports = stampRouter