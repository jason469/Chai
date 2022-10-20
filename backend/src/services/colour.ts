import {IColour} from "../utilities/interfaces/modelInterfaces";

const Colour = require('../models/Colour')

module.exports = class ColourService {
    static async getAllColours() {
        try {
            const allColours = await Colour.find();
            return allColours;
        } catch (error) {
            console.log(`Could not fetch colours ${error}`)
        }
    }

    static async getColourOrCreate(data: IColour) {
        try {
            var colour = await Colour.findOne({name: data.name});
            if (!colour) {
                colour = new Colour({
                    name: data.name,
                    hexCode: data.hexCode
                })
                await colour.save()
            }
            return colour;
        } catch (error) {
            console.log(`Could not fetch colour ${error}`)
        }
    }

    static async deleteColour(name: string) {
        try {
            const colour = await Colour.findOne({name: name})
            if (colour) {
                await colour.deleteOne()
            }
            return true
        } catch (error) {
            console.log(`Could not fetch colour ${error}`)
            return false
        }
    }
}