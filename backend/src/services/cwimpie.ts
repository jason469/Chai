import {INewCwimpieData} from "../utilities/interfaces/newCwimpieData";

const Cwimpie = require('../models/Cwimpie')

const colourService = require('../services/colour')
const speciesService = require('../services/species')


module.exports = class CwimpieService {
    static async getAllCwimpies() {
        try {
            const allCwimpies = await Cwimpie.find();
            return allCwimpies;
        } catch (error) {
            console.log(`Could not fetch cwimpies ${error}`)
        }
    }

    static async getCwimpie(name: String) {
        try {
            const cwimpie = await Cwimpie.findOne({name: name});
            return cwimpie;
        } catch (error) {
            console.log(`Could not fetch cwimpie ${error}`)
        }
    }

    static async createCwimpie(cwimpieData: INewCwimpieData) {
        const cwimpie = new Cwimpie({
            name: cwimpieData.name,
            colour: await colourService.getColourOrCreate(cwimpieData.colour),
            species: await speciesService.getSpeciesOrCreate(cwimpieData.species)
        })
        await cwimpie.save()
        console.log(cwimpie)
        return cwimpie
    }
}