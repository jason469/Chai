import {IHobby} from "../utilities/interfaces/modelInterfaces";
import {ProfessionTypes} from "../utilities/enums/model_enums";
import {getValueFromEnumWithKey} from "../utilities/functions/misc";

const Hobby = require('../models/Hobby')

module.exports = class HobbyService {
    static async getAllHobbies() {
        try {
            const allHobbies = await Hobby.find();
            return allHobbies;
        } catch (error) {
            console.log(`Could not fetch hobbies ${error}`)
        }
    }

    static async getHobbyOrCreate(data: IHobby) {
        try {
            var hobby = await Hobby.findOne({name: data.name});
            if (!hobby) {
                hobby = new Hobby({
                    name: data.name,
                })
                if (data.description) {
                    hobby.update({description: data.description})
                }
                await hobby.save()
            }
            return hobby
        } catch (error) {
            console.log(`Could not fetch hobby ${error}`)
        }
    }
}