import {IDailySchedule} from "../utilities/interfaces/modelInterfaces";
import {Types} from "mongoose";
import mongoose from 'mongoose';

const DailySchedule = require('../models/DailySchedule')
const Cwimpie = require('../models/Cwimpie')

module.exports = class DailyScheduleService {
    static async getAllDailySchedules() {
        try {
            return await DailySchedule.find()
                .populate({
                    path: 'tasks',
                    model: 'Task'
                });
        } catch (error) {
            console.log(`Could not fetch daily schedules ${error}`)
        }
    }

    static async getDailyScheduleOrCreate(data: IDailySchedule) {
        try {
            let dailySchedule = await DailySchedule.findOne(
                {
                    date: data.date,
                    cwimpieId: data.cwimpieId
                }
            );
            if (!dailySchedule) {
                dailySchedule = new DailySchedule({
                    date: data.date,
                    cwimpieId: data.cwimpieId,
                    tasks: data.tasks
                })
                dailySchedule.save()
                return dailySchedule
            }
            return dailySchedule
        } catch (error) {
            console.log(`Could not fetch daily schedule ${error}`)
        }
    }

    static async deleteDailySchedule(data: IDailySchedule) {
        try {
            const dailySchedule = await DailySchedule.findOne(
                {
                    date: new Date(data.date),
                    cwimpieId: new mongoose.Types.ObjectId(data.cwimpieId)
                }
            );
            if (dailySchedule) {
                await dailySchedule.deleteOne()
            }
            return true
        } catch (error) {
            console.log(`Could not delete daily schedule ${error}`)
            return false
        }
    }
}