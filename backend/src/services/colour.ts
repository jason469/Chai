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

    static async getColourOrCreate(data:IColour) {
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

    static async deleteColour(name:string) {
        try {
            Colour.findOneAndDelete({name: name}, function(err:Error, docs:any) {
                if (err) {
                    console.log('error',err)
                } else {
                    return true
                }
            })
        } catch (error) {
            console.log(`Could not fetch colour ${error}`)
            return false
        }
    }
}