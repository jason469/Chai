import * as dotenv from 'dotenv'
import {loadFixtures} from "./src/config/fixtureCommands";
import {createDailySchedules} from "./src/utilities/periodicTasks/createDailySchedule";
import {cacheSetUpConfig} from "./src/config/caches/cacheSetUp.config";

const express = require('express');
const cors = require("cors");

const authRouter = require('./src/routes/auth');
const cwimpieRouter = require('./src/routes/cwimpie');
const colourRouter = require('./src/routes/colour');
const stampRouter = require('./src/routes/stamp');
const favouriteRouter = require('./src/routes/favourite');
const hobbyRouter = require('./src/routes/hobby');
const professionRouter = require('./src/routes/profession');
const speciesRouter = require('./src/routes/species');
const userRouter = require('./src/routes/users');
const dailyScheduleRouter = require('./src/routes/dailySchedule');
const countryRouter = require('./src/routes/country');

const app = express();

const databaseConfig = require('./src/config/database.config');


dotenv.config()
require('dotenv').config()

databaseConfig.dbConnect();
loadFixtures()
cacheSetUpConfig()
createDailySchedules()

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}))
// app.use('/public', express.static('public'));
app.use('/public', express.static('public'));

app.use(authRouter)
app.use(colourRouter)
app.use(cwimpieRouter)
app.use(favouriteRouter)
app.use(hobbyRouter)
app.use(professionRouter)
app.use(speciesRouter)
app.use(stampRouter)
app.use(userRouter)
app.use(dailyScheduleRouter)
app.use(countryRouter)

if (process.env.API_PORT)
app.listen(PORT, "0.0.0.0", () => {
    console.log(`connected at port ${PORT}`)
})