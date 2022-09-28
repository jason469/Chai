const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            required: true,
            type: String,
            trim: true,
        },
        username: {
            required: true,
            type: String,
            trim: true,
        },
        password: {
            required: true,
            type: String,
            validate: {
                validator: value => {
                    return value.length > 6;
                },
                message: "Your password needs to be at least 6 characters long"
            }
        },
    },
    {
        collection: "Users"
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;