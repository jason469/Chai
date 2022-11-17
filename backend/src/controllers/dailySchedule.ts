import {Request, Response} from "express";

const DailyScheduleService = require('../services/dailySchedule')

module.exports = class DailyScheduleController {
    static async getAllDailySchedules(req: Request, res: Response) {
        try {
            const allDailySchedules = await DailyScheduleService.getAllDailySchedules();
            if (allDailySchedules.length == 0) {
                res.status(404).json("There are no daily schedules")
                return
            }
            res.json(allDailySchedules);
            return
        } catch (error) {
            res.status(500).json({error: error})
            return
        }
    }


    static async deleteDailySchedule(req: Request, res: Response) {
        try {
            const dailyScheduleData = req.body.dailyScheduleData;
            await DailyScheduleService.deleteDailySchedule(dailyScheduleData)
            await res.status(200).json({msg: `Daily schedule has been successfully deleted`})
            return
        } catch (error) {
            await res.status(500).json({msg: error})
            return
        }
    }
};