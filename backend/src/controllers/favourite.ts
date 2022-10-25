import {Request, Response} from "express";

const FavouriteService = require('../services/favourite')

module.exports = class FavouriteController {
    static async getAllFavourites(req: Request, res: Response) {
        try {
            const allFavourites = await FavouriteService.getAllFavourites();
            if (allFavourites.length == 0) {
                res.status(404).json("There are no favourites")
            }
            res.json(allFavourites);
            return
        } catch (error) {
            res.status(500).json({error: error})
            return
        }
    }

    static async getFavouriteTypes(req: Request, res: Response) {
        try {
            const allFavourites = await FavouriteService.getFavouriteTypes();
            if (allFavourites.length == 0) {
                res.status(404).json("There are no favourites")
            }
            res.json(allFavourites);
            return
        } catch (error) {
            res.status(500).json({error: error})
            return
        }
    }

    static async deleteFavourite(req: Request, res: Response) {
        try {
            const favouriteName = req.body.name;
            const favouriteType = req.body.type;
            await FavouriteService.deleteFavourite(favouriteName, favouriteType)
            await res.status(200).json({msg: `${favouriteName} has been successfully deleted`})
            return
        } catch (error) {
            await res.status(500).json({msg: error})
            return
        }
    }
};