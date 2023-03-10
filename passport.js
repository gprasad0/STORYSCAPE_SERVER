// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const dotenv = require('dotenv')
const addGoogleUser = require('./app/controllers/userController').addGoogleUser
dotenv.config()
// import GoogleStrategy from "passport-google-oauth20";
console.log("process.env.GOOGLE_CLIENT_ID====>",process.env.GOOGLE_CLIENT_ID)
passport.use(
    new GoogleStrategy(
        {
            clientID:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            callbackURL:"/auth/google/callback",
            scope:["profile","email"]
        },
          (accessToken,refreshToken,profile,done) => {
            console.log("profile==>",profile)

            const id = profile.id;
            const email = profile.emails[0].value;
            const firstName = profile.name.givenName;
            const lastName = profile.name.familyName;
            const displayName = profile.displayName
            console.log("ee7788899>>>,",
            lastName)
            const currentUser = addGoogleUser(
                id,
                email,
                firstName,
                lastName,
                displayName,
                "googleUser",
                "google"
                )
            done(null, profile);
            // return done(null, false, {
            //     message: `You have previously signed up with a different signin method`,
            //   });
            // callback(null,profile)

        }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})

// const PassportSetup = passport
// export default PassportSetup;