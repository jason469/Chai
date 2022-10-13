import {IHobby} from "../utilities/interfaces/modelInterfaces";

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
                    hobby.description = data.description
                }
                hobby.save()
                return hobby
            }
            return hobby
        } catch (error) {
            console.log(`Could not fetch hobby ${error}`)
        }
    }
}