import mongoose from 'mongoose';

const ColourSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        hexCode: {
            type: String,
            required: true,
            trim: true
        },
    },
    {
        collection: "Colours"
    }
)

module.exports = mongoose.model('Colour', ColourSchema);