const mongoose = require('mongoose');
require('dotenv').config()

export const dbConnect = () => {
    mongoose.connect(
        `${process.env.DB_CONNECTION}`)
        .then(() => console.log('Connection Successful'))
        .catch((error: any) => console.log(error));
}
