import {ISpecies} from "../utilities/interfaces/modelInterfaces";
import {SpeciesChoices} from "../utilities/enums/model_enums";

const Species = require('../models/Species')

module.exports = class SpeciesService {
    static async getAllSpecies() {
        try {
            const allSpecies = await Species.find();
            return allSpecies;
        } catch (error) {
            console.log(`Could not fetch species ${error}`)
        }
    }

    static async getSpeciesOrCreate(data:ISpecies) {
        try {
            var species = await Species.findOne({name: data.name});
            if (!species) {
                species = new Species({
                    name: data.name,
                    type: Object.values(SpeciesChoices)[Object.keys(SpeciesChoices).indexOf(data.type)]
                })
                await species.save()
            }
            return species;
        } catch (error) {
            console.log(`Could not fetch species ${error}`)
        }
    }
}