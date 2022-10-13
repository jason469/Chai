import {INewCwimpieData} from "../utilities/interfaces/newCwimpieData";
import {IFavourite, IHobby, IProfession} from "../utilities/interfaces/modelInterfaces";

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
            const allCwimpies = await Cwimpie.find();
            return allCwimpies;
        } catch (error) {
            console.log(`Could not fetch cwimpies ${error}`)
        }
    }

    static async getCwimpie(name: string) {
        try {
            const cwimpie = await Cwimpie.findOne({name: name})
                .populate('colour_id')
                .populate('species_id')
                .populate('favourites')
                .populate('professions')
                .populate('hobbies')
                .populate('stamp_id')
                .populate('partner_id')
                .populate('primary_parent_id', 'username name')
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
            colour_id: await colourService.getColourOrCreate(cwimpieData.colour),
            species_id: await speciesService.getSpeciesOrCreate(cwimpieData.species),
            favourites: favourites,
            professions: professions,
            hobbies: hobbies,
            stamp_id: await stampService.getStampOrCreate(cwimpieData.stamp),
            birthdate: new Date(cwimpieData.birthdate),
            primary_parent_id: await userService.getUser(cwimpieData.primary_parent)
        })
        if (cwimpieData.partner_name) {
            const partner_cwimpie = await this.getCwimpie(cwimpieData.partner_name)
            if (partner_cwimpie) {
                cwimpie.partner_id = partner_cwimpie
            }
        }
        await cwimpie.save()
        return cwimpie
    }
}