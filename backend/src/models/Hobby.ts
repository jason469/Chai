import mongoose from 'mongoose';

const HobbySchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
        }
    },
    {
        collection: "Hobbies"
    }
)

module.exports = mongoose.model('Hobby', HobbySchema);