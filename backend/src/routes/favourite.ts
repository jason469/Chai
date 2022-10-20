export {};
const express = require('express');

const auth = require('../middlewares/auth.mid');
const favouriteCtrl = require('../controllers/favourite')

const favouriteRouter = express.Router();

favouriteRouter.get('/api/favourites', auth, favouriteCtrl.getAllFavourites)
favouriteRouter.delete('/api/favourites', auth, favouriteCtrl.deleteFavourite)

module.exports = favouriteRouter