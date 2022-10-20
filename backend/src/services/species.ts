import {ISpecies} from "../utilities/interfaces/modelInterfaces";
import {SpeciesChoices} from "../utilities/enums/modelEnums";
import {getValueFromEnumWithKey} from "../utilities/functions/misc";
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
                    type: getValueFromEnumWithKey(SpeciesChoices, data.type)
                })
                await species.save()
            }
            return species;
        } catch (error) {
            console.log(`Could not fetch species ${error}`)
        }
    }

    static async deleteSpecies(name: string) {
        try {
            const species = await Species.findOne({name: name})
            if (species) {
                await species.deleteOne()
            }
            return true
        } catch (error) {
            console.log(`Could not fetch species ${error}`)
            return false
        }
    }
}