// require('dotenv').config();
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./app/routes/routes.js";
dotenv.config()
const app = express();
const mongoString = process.env.DATABASE_URL;
// const routes = require('./app/routes/routes');
// const cors = require('cors');

app.use(cors({
    origin: '*'
}));

app.use('/api', router)


mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


app.use(express.json());

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})