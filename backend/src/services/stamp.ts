import {IStamp} from "../utilities/interfaces/modelInterfaces";
import {getValueFromEnumWithKey} from "../utilities/functions/misc";
import {FontChoices} from "../utilities/enums/modelEnums";
const Stamp = require('../models/Stamp')

const colourService = require('../services/colour')

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
            let stamp = await Stamp.findOne({
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

    static async getAllFonts() {
        try {
            const allFonts = Stamp.schema.path('font').enumValues
            return allFonts;
        } catch (error) {
            console.log(`Could not fetch fonts ${error}`)
        }
    }
}