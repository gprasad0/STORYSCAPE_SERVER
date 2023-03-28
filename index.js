


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
        keys:["storyscape__SERVER__KEY__ENCRYPT"],
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

//Oauth process - 
// Request comes in from the browser/Client for the route /auth/google -> authRoutes.js
//This will call the passport.authenticate('google', { scope: ['profile', 'email'] }) -> Before even doing this we need to configure passport to handle google or facebook or github oauth strategy
//This strategy will be done by setting up secret key and id in google,facebook accounts [using scope]
//This will allow the browser to open a window to show the gmail accounts for the user to allow authentication
//Once the user allows the app to use the accounts, a redirect url is called by google that is - /google/callback
//Google will send a code to this callback url. Using this code , passport will see the code and use it to retrieve some data from google and will return it to our server
//This will trigger the callback function in the passport.js file.
// -----> (accessToken,refreshToken,profile,done) => {
//     console.log("profile==>",profile)

//     const id = profile.id;
//     const email = profile.emails[0].value;
//     const firstName = profile.name.givenName;
//     const lastName = profile.name.familyName;
//     const displayName = profile.displayName
//     console.log("ee7788899>>>,",
//     lastName,accessToken,refreshToken)
//     const currentUser = addGoogleUser(
//         id,
//         email,
//         firstName,
//         lastName,
//         displayName,
//         "googleUser",
//         "google"
//         )
//     done(null, profile);
//     // return done(null, false, {
//     //     message: `You have previously signed up with a different signin method`,
//     //   });
//     // callback(null,profile)

// }
//Here you can save the user if he is a first time login or retrieve the user if he is already a existing user
//Once this call back function is called, the done parameter will call passport.serializeUser. This basically creates the cookie which will be sent using the params sent through done(null,user.id)
//serializeUser is used from the server. deSerializeuser is used when we get the cookies from the browser