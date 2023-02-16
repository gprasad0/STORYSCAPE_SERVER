// require('dotenv').config();
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./app/routes/auth.js";
import cookieSession from "cookie-session";
import passport from "passport";
import PassportSetup from "./passport.js";

dotenv.config()
const app = express();
const mongoString = process.env.DATABASE_URL;

// const routes = require('./app/routes/routes');
// const cors = require('cors');
app.use(express.json());
app.use(
    cookieSession({
        name:"session",
        keys:["cyberwolve"],
        maxAge:24*60*60*100
    })
)
app.use(passport.initialize());
app.use(passport.session()); 
app.use(cors({
    origin: '*',
    credentials:true
}));

// app.use('/api', router)

app.use('/auth', router)

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})




app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})