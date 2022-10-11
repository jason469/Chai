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
        },
        user: [  // A country can belong to many users
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        collection: "Countries"
    }
)

module.exports = mongoose.model('Country', CountrySchema);