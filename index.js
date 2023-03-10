


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
const { logger, logEvents } = require('./app/middleware/logger')
const errorHandler = require('./app/middleware/errorHandler')
const cookieParser = require('cookie-parser')
// import PassportSetup from "./passport.js";
// const passportSetup = PassportSetup
dotenv.config()
// const app = express();
const mongoString = process.env.DATABASE_URL;
app.use(cookieParser())
// const routes = require('./app/routes/routes');
// const cors = require('cors');
app.use(logger)
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
    origin: true,
    credentials:true,
    "preflightContinue": false,
}));

// app.use('/api', chatgptRouter)

app.use('/', router)
app.use(errorHandler)
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

//Authorization : Process of verifying what resources a user has access to
//Authentication :  Process of verifying who someone is  
//JWT token :  Issued after the initaial login authentication takes place. Acces and refresh token is  sent. 
//access token ->sent as json. Client stores it in state.Do not store in localstorage or cookie and not even in js
//refresh token - sent as http cookie onlymust have expiry . 