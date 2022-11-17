import mongoose from 'mongoose';
import {cascadeDelete} from "../utilities/functions/misc";
const Cwimpie = require("./Cwimpie");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
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
        countryId: {  // A user can only have 1 country
            type: mongoose.Schema.Types.ObjectId,
            ref:'Country'
        }
    },
    {
        collection: "Users"
    }
);

UserSchema.post("deleteOne", { document: true, query: false },async function (user, next) {
    await cascadeDelete(Cwimpie, this, "primaryParentId");
})


const User = model("User", UserSchema);
module.exports = User;