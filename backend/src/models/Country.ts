import mongoose from 'mongoose';
import {cascadeDelete} from "../utilities/functions/misc";

const User = require('../models/User')


const CountrySchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true,
        },
        flag_image: {
            data: Buffer,
            contentType: String
        },
        coordinates: [
            [{
                required: false,
                type: Number,
            }, {
                required: false,
                type: Number,
            }]
        ],
    },
    {
        collection: "Countries"
    }
)

CountrySchema.post("deleteOne", {document: true, query: false}, async function (colour, next) {
    await cascadeDelete(User, this, "countryId");
})

module.exports = mongoose.model('Country', CountrySchema);