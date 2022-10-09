import * as dotenv from 'dotenv'
const express = require('express');
const cors = require("cors");

const app = express();
const authRouter = require('./src/routes/auth');
const databaseConfig = require('./src/config/database.config');

dotenv.config()
require('dotenv').config()

databaseConfig.dbConnect();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}))
app.use(authRouter)


app.listen(PORT, "0.0.0.0", () => {
    console.log(`connected at port ${PORT}`)
})