

// // const passportSetup = require("./passport");
// import router from "./app/routes/auth.js";
// import cookieSession from "cookie-session";
// import passport from "passport";
// import passport from "passport";
// import passPortConfig from "./passport.js";
const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const mongoose =  require("mongoose")

const passportSetup = require("./passport");
const passport = require("passport");
const jwt = require("jsonwebtoken")
const router = require("./app/routes/mainRouter");
// const chatgptRouter = require("./app/routes/chatGptRoutes")
const app = express();
const dotenv = require('dotenv')
// import PassportSetup from "./passport.js";
// const passportSetup = PassportSetup
dotenv.config()
// const app = express();
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
// passPortConfig(passport);
app.use(cors({
    origin: '*',
    credentials:true
}));

// app.use('/api', chatgptRouter)

app.use('/', router)

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