import {IStamp} from "../utilities/interfaces/modelInterfaces";
import {getValueFromEnumWithKey} from "../utilities/functions/misc";
import {FontChoices, ProfessionTypes} from "../utilities/enums/model_enums";

const colourService = require('../services/colour')

const Stamp = require('../models/Stamp')

module.exports = class StampService {
    static async getAllStamps() {
        try {
            const allStamps = await Stamp.find()
                .populate("primary_colour")
                .populate("accent_colour");
            return allStamps;
        } catch (error) {
            console.log(`Could not fetch stamps ${error}`)
        }
    }

    static async getStampOrCreate(data: IStamp) {
        try {
            const primary_colour = await colourService.getColourOrCreate(data.primary_colour)
            const accent_colour = await colourService.getColourOrCreate(data.accent_colour)
            var stamp = await Stamp.findOne({
                primary_colour: primary_colour,
                accent_colour: accent_colour,
                font: data.font
            });
            if (!stamp) {
                stamp = new Stamp({
                    primary_colour: primary_colour,
                    accent_colour: accent_colour,
                    font: getValueFromEnumWithKey(FontChoices, data.font),
                })
                await stamp.save()
            }
            return stamp
        } catch (error) {
            console.log(`Could not create stamp ${error}`)
        }
    }
}