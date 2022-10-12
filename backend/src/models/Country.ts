import mongoose from 'mongoose';

const CountrySchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        flag_image: {
            data: Buffer,
            contentType: String
        }
    },
    {
        collection: "Countries"
    }
)

module.exports = mongoose.model('Country', CountrySchema);