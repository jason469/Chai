import {INewCwimpieData, IUpdateCwimpieData} from "../utilities/interfaces/cwimpieInterfaces";
import {IFavourite, IHobby, IProfession} from "../utilities/interfaces/modelInterfaces";
import {getPropertyFromObject} from "../utilities/functions/misc";
import {getCwimpieProperty} from "../utilities/functions/cwimpies";

const Cwimpie = require('../models/Cwimpie')

const colourService = require('../services/colour')
const speciesService = require('../services/species')
const favouriteService = require('../services/favourite')
const professionService = require('../services/profession')
const hobbyService = require('../services/hobby')
const stampService = require('../services/stamp')
const userService = require('../services/user')

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

    static async getCwimpie(name: string) {
        try {
            const cwimpie = await Cwimpie.findOne({name: name})
                .populate('colourId')
                .populate('speciesId')
                .populate('favourites')
                .populate('professions')
                .populate('hobbies')
                .populate('stampId')
                .populate('partnerId')
                .populate('primaryParentId', 'username name')
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

        const cwimpie = new Cwimpie({
            name: cwimpieData.name,
            colourId: await colourService.getColourOrCreate(cwimpieData.colour),
            speciesId: await speciesService.getSpeciesOrCreate(cwimpieData.species),
            favourites: favourites,
            professions: professions,
            hobbies: hobbies,
            stampId: await stampService.getStampOrCreate(cwimpieData.stamp),
            birthdate: new Date(cwimpieData.birthdate),
            primaryParentId: await userService.getUser(cwimpieData.primaryParent)
        })
        if (cwimpieData.partnerName) {
            const partner_cwimpie = await this.getCwimpie(cwimpieData.partnerName)
            if (partner_cwimpie) {
                cwimpie.partnerId = partner_cwimpie
            }
        }
        await cwimpie.save()
        return cwimpie
    }

    static async updateCwimpie(updateData: IUpdateCwimpieData) {
        let cwimpie = await this.getCwimpie(updateData.name)
        let cwimpieProperty = await getPropertyFromObject(cwimpie, updateData.property)

        type ObjectKey = keyof typeof cwimpie;
        const property = updateData.property as ObjectKey;

        if (cwimpieProperty !== undefined) {  // Replace it
            let newValue = await getCwimpieProperty(cwimpie, updateData.property, updateData.data)

            if (Array.isArray(cwimpieProperty)) {  // Default behaviour is to just add the new value
                cwimpie[property].push(newValue)
            } else {
                cwimpie[property] = newValue
            }
            await cwimpie.save()
        } else {  // Property doesn't exist on the object
            return null
        }
    }

    static async deleteCwimpie(name: string) {
        try {
            await Cwimpie.deleteOne({name: name});
        } catch (error) {
            console.log(`Could not delete cwimpie ${error}`)
        }
    }
}