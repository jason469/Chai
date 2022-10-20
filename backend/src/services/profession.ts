import {IProfession} from "../utilities/interfaces/modelInterfaces";
import {ProfessionTypes} from "../utilities/enums/modelEnums";
import {getValueFromEnumWithKey} from "../utilities/functions/misc";
const Profession = require('../models/Profession')

module.exports = class ProfessionService {
    static async getAllProfessions() {
        try {
            const allProfessions = await Profession.find();
            return allProfessions;
        } catch (error) {
            console.log(`Could not fetch professions ${error}`)
        }
    }

    static async getProfessionOrCreate(data: IProfession) {
        try {
            var profession = await Profession.findOne({name: data.name, type: data.type});
            if (!profession) {
                profession = new Profession({
                    name: data.name,
                    type: getValueFromEnumWithKey(ProfessionTypes, data.type),
                })
                if (data.description) {
                    profession.update({description: data.description})
                }
                await profession.save()
            }
            return profession
        } catch (error) {
            console.log(`Could not fetch profession ${error}`)
        }
    }

    static async deleteProfession(name: string) {
        try {
            const profession = await Profession.findOne({name: name})
            if (profession) {
                await profession.deleteOne()
            }
            return true
        } catch (error) {
            console.log(`Could not fetch profession ${error}`)
            return false
        }
    }
}