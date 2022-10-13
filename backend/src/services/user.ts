import {IUser} from "../utilities/interfaces/modelInterfaces";
import {INewUser} from "../utilities/interfaces/newUserData";

const bcryptjs = require('bcryptjs');
const User = require('../models/User')


module.exports = class UserService {
    static async getAllUsers() {
        try {
            const allUsers = await User.find();
            return allUsers;
        } catch (error) {
            console.log(`Could not fetch users ${error}`)
        }
    }

    static async getUser(data:IUser) {
        try {
            var user = await User.findOne({username: data.username});
            return user;
        } catch (error) {
            console.log(`Could not fetch user ${error}`)
        }
    }

    static async createUser(data:INewUser) {
        try {
            const existingUser = await User.findOne({username: data.username});
            if (existingUser) {
                return "This user already exists";
            } else {
                const hashedPassword = await bcryptjs.hash(data.password, 8);
                let user = new User({
                    username: data.username,
                    password: hashedPassword,
                    name: data.name,
                })
                user = await user.save()
                return user
            }
        } catch (e: any) {
            console.log('user couldnt be created',e)
        }
    }
}