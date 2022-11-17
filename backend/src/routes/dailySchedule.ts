export {};
const express = require('express');

const auth = require('../middlewares/auth.mid');
const dailyScheduleCtrl = require('../controllers/dailySchedule')

const dailyScheduleRouter = express.Router();

dailyScheduleRouter.get('/api/daily-schedule', auth, dailyScheduleCtrl.getAllDailySchedules)
dailyScheduleRouter.delete('/api/daily-schedule', auth, dailyScheduleCtrl.deleteDailySchedule)

module.exports = dailyScheduleRouter