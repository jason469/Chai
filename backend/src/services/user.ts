import {IUser} from "../utilities/interfaces/modelInterfaces";
import {INewUser} from "../utilities/interfaces/newUserData";

const bcryptjs = require('bcryptjs');
const User = require('../models/User')
const Country = require('../models/Country')
const CountryService = require('../services/country')

module.exports = class UserService {
    static async getAllUsers() {
        try {
            return await User.find()
                .populate('countryId')
                .select('-password');
        } catch (error) {
            console.log(`Could not fetch users ${error}`)
        }
    }

    static async getUser(data: IUser) {
        try {
            return await User.findOne({name: data.name})
                .select('-password')
                .populate('countryId');
        } catch (error) {
            console.log(`Could not fetch user ${error}`)
        }
    }

    static async getOrCreateUser(data: INewUser) {
        try {
            const existingUser = await User.findOne({username: data.username});
            if (existingUser) {
                return "This user already exists";
            } else {
                const hashedPassword = await bcryptjs.hash(data.password, 8);
                const country = await CountryService.getOrCreateCountry(data.countryData)
                console.log(country)
                let user = new User({
                    username: data.username,
                    password: hashedPassword,
                    name: data.name,
                    countryId: country
                })
                user = await user.save()
                return "New user was created"
            }
        } catch (e: any) {
            console.log('user couldnt be created', e)
        }
    }
}