import {INewCwimpieData, IUpdateCwimpieData} from "../utilities/interfaces/cwimpieInterfaces";
import {IFavourite, IHobby, IProfession} from "../utilities/interfaces/modelInterfaces";
import {getCwimpieProperty} from "../utilities/functions/cwimpies";

const Cwimpie = require('../models/Cwimpie')
const User = require('../models/User')

const colourService = require('../services/colour')
const speciesService = require('../services/species')
const favouriteService = require('../services/favourite')
const professionService = require('../services/profession')
const hobbyService = require('../services/hobby')
const stampService = require('../services/stamp')
const userService = require('../services/user')
const sexService = require('../services/sex')
const miscService = require('../services/misc')


module.exports = class CwimpieService {
    static async getAllCwimpies() {
        try {
            const allCwimpies = await Cwimpie.find()
                .populate('colourId', 'hexCode name')
                .populate('speciesId', 'name type iconName')
                .populate('favourites', 'name type')
                .populate('professions', 'name type')
                .populate('hobbies', 'name')
                .populate({
                    path: 'stampId',
                    populate: [
                        {
                            path: 'primary_colour'
                        }, {
                            path: 'accent_colour'
                        }
                    ],
                })
                .populate('partnerId')
                .populate({
                    path: 'primaryParentId',
                    populate: [
                        {
                            path: 'countryId',
                            model: 'Country'
                        }
                    ],
                })
                .populate({
                    path: 'dailyScheduleId',
                    populate: [
                        {
                            path: 'tasks',
                            model: 'Task'
                        }
                    ],
                })
            return allCwimpies;
        } catch (error) {
            console.log(`Could not fetch cwimpies ${error}`)
        }
    }

    static async getAllCwimpiesFromUser(username:string) {
        try {
            const user = await User.findOne({username: username})
            return await Cwimpie.find({primaryParentId: user._id})
                .populate('colourId', 'hexCode name')
                .populate('speciesId', 'name type iconName')
                .populate('favourites', 'name type')
                .populate('professions', 'name type')
                .populate('hobbies', 'name')
                .populate({
                    path: 'stampId',
                    populate: [
                        {
                            path: 'primary_colour'
                        }, {
                            path: 'accent_colour'
                        }
                    ],
                })
                .populate('partnerId')
                .populate({
                    path: 'primaryParentId',
                    populate: [
                        {
                            path: 'countryId',
                            model: 'Country'
                        }
                    ],
                })
                .populate({
                    path: 'dailyScheduleId',
                    populate: [
                        {
                            path: 'tasks',
                            model: 'Task'
                        }
                    ],
                });
        } catch (error) {
            console.log(`Could not fetch cwimpies ${error}`)
        }
    }

    static async getCwimpie(name: string) {
        try {
            const cwimpie = await Cwimpie.findOne({name: name})
                .populate('colourId')
                .populate('speciesId')
                .populate('favourites')
                .populate('professions')
                .populate('hobbies')
                .populate({
                    path: 'stampId',
                    populate: [
                        {
                            path: 'primary_colour'
                        }, {
                            path: 'accent_colour'
                        }
                    ],
                })
                .populate('partnerId')
                .populate({
                    path: 'primaryParentId',
                    populate: [
                        {
                            path: 'countryId',
                            model: 'Country'
                        }
                    ],
                })
            ;
            if (cwimpie) {
                return cwimpie;
            } else {
                return null;
            }
        } catch (error) {
            console.log(`Could not fetch cwimpie ${error}`)
        }
    }

    static async createCwimpie(cwimpieData: INewCwimpieData) {
        var favourites: IFavourite[] = [];
        var professions: IProfession[] = [];
        var hobbies: IHobby[] = [];

        for (let favouriteData of cwimpieData.favourites) {
            const newFavourite = await favouriteService.getFavouriteOrCreate(favouriteData)
            favourites.push(newFavourite)
        }

        for (let professionData of cwimpieData.professions) {
            const newProfession = await professionService.getProfessionOrCreate(professionData)
            professions.push(newProfession)
        }

        for (let hobbyData of cwimpieData.hobbies) {
            const newHobby = await hobbyService.getHobbyOrCreate(hobbyData)
            hobbies.push(newHobby)
        }

        try {
            const cwimpie = new Cwimpie({
                name: cwimpieData.name,
                sex: cwimpieData.sex,
                colourId: await colourService.getColourOrCreate(cwimpieData.colour),
                speciesId: await speciesService.getSpeciesOrCreate(cwimpieData.species),
                favourites: favourites,
                professions: professions,
                hobbies: hobbies,
                stampId: await stampService.getStampOrCreate(cwimpieData.stamp),
                birthdate: await miscService.convertDateToUTC(cwimpieData.birthdate),
                primaryParentId: await userService.getUser(cwimpieData.primaryParent.name!, "name")
            })
            if (cwimpieData.partner) {
                const partner_cwimpie = await this.getCwimpie(cwimpieData.partner)
                if (partner_cwimpie) {
                    cwimpie.partnerId = partner_cwimpie
                }
            }
            await cwimpie.save()
            return cwimpie
        } catch (error) {
          console.log(`there was an error in creating the cwimpie, with the message ${error}`)
        }
    }

    static async addCwimpiePhoto(url:string, photoName:string, cwimpieName:string) {
        try {
            let cwimpie = await CwimpieService.getCwimpie(cwimpieName);
            if (cwimpie) {
                cwimpie.photo = url + '/public/media/' + photoName
                await cwimpie.save()
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }

    static async updateCwimpie(cwimpie: typeof Cwimpie, updateData: IUpdateCwimpieData) {
        const ignoreFields = ["cwimpieId", "name", "user", "token", "dailyScheduleId", "photo"] // Fields on updateData that should be ignored
        const cwimpieFields = ["birthdate", "sex"]  // Fields that only exist on a cwimpie object
        const arrayFields = ["favourites", "professions", "hobbies"]  // Fields on a cwimpie object that exists as a list
        const objectFields = ["colour", "species", "primaryParent", "stamp", "partner"] // Fields on a cwimpie object that exists as FK relationships

        for (const [key, value] of Object.entries(updateData)) {
            let cwimpieKey:string = key
            let newValue:any;
            if (ignoreFields.includes(key)) {
                continue
            } else if (cwimpieFields.includes(key)) {
                newValue = (key == "sex") ? await sexService.getSex(value) : await miscService.convertDateToUTC(value)
            } else if (arrayFields.includes(key)) {
                let newArray = []
                for (const currentObject of value) {
                    let newObject = await getCwimpieProperty(key, currentObject)
                    newArray.push(newObject)
                }
                newValue = newArray
            } else if (objectFields.includes(key)) {
                newValue = await getCwimpieProperty(key, value)
                cwimpieKey = `${key}Id`
            }
            cwimpie[cwimpieKey] = newValue
        }
        await cwimpie.save()
    }

    static async deleteCwimpie(name: string) {
        try {
            await Cwimpie.deleteOne({name: name});
        } catch (error) {
            console.log(`Could not delete cwimpie ${error}`)
        }
    }
}