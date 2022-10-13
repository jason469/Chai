import * as dotenv from 'dotenv'
import {loadFixtures} from "./src/config/fixtureCommands";

const express = require('express');
const cors = require("cors");

const app = express();
const authRouter = require('./src/routes/auth');
const cwimpieRouter = require('./src/routes/cwimpie');
const databaseConfig = require('./src/config/database.config');

const Country = require('./src/models/Country')

dotenv.config()
require('dotenv').config()

databaseConfig.dbConnect();
loadFixtures()

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}))

app.use(authRouter)
app.use(cwimpieRouter)


app.listen(PORT, "0.0.0.0", () => {
    console.log(`connected at port ${PORT}`)
})