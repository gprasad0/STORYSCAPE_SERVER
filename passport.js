import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const GoogleStrategy = require("passport-google-oauth20").Strategy;
import passport from "passport";
import dotenv from "dotenv";
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
        function (accessToken,refreshToken,profile,callback){
            callback(null,profile)
        }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})

const PassportSetup = passport
export default PassportSetup;