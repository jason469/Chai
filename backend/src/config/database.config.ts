require('dotenv').config()

import mongoose from "mongoose";

export const dbConnect = () => {
    mongoose.connect(
        `${process.env.DB_CONNECTION}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as mongoose.ConnectOptions)
        .then(() => console.log('Connection Successful'))
        .catch((error: any) => console.log(error));
}