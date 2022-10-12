import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
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
                validator: (value: string) => {
                    return value.length > 6;
                },
                message: "Your password needs to be at least 6 characters long"
            }
        },
        country_id: [{  // A user can only have 1 country
            type: mongoose.Schema.Types.ObjectId,
            ref:'Country'
        }]
    },
    {
        collection: "Users"
    }
);

const User = model("User", userSchema);
module.exports = User;