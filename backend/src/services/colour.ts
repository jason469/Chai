import {IColour} from "../utilities/interfaces/modelInterfaces";
import {allColoursCache} from "../config/caches/allCaches";

const Colours = require('../models/Colours')

module.exports = class ColourService {
    static async getAllColours() {
        try {
            const allColours = await Colours.find();
            return await allColours;
        } catch (error) {
            console.log(`Could not fetch colours ${error}`)
        }
    }

    static async getColourOrCreate(data: IColour) {

        try {
            let colour;
            colour = await Colours.findOne({name: data.name});
            if (!colour) {
                let hexCode = data.hexCode
                if (data.hexCode?.slice(0, 1) !== "#") {
                    hexCode = "#" + data.hexCode
                }
                colour = new Colours({
                    name: data.name,
                    hexCode: hexCode
                })
                await colour.save()
                await allColoursCache.setValueByKey(colour.name, colour)
            }
            return colour;
        } catch (error) {
            console.log(`Could not fetch colour ${error}`)
        }
    }

    static async deleteColour(name: string) {
        try {
            const colour = await Colours.findOne({name: name})
            if (colour) {
                await colour.deleteOne()
                await allColoursCache.deleteValueByKey(name)
            }
            return true
        } catch (error) {
            console.log(`Could not fetch colour ${error}`)
            return false
        }
    }
}