require('dotenv').config()

const express = require('express');
const cors = require("cors");

const app = express();
const authRouter = require('./src/routes/auth');
import {dbConnect} from './src/config/database.config'

const PORT = 5000;

dbConnect();

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