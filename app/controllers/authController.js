const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    console.log("asyncHandler===>",req.body)

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUser = await User.findOne({ email : email })
    console.log("asyncHandler===>",foundUser)

    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    // const match = await bcrypt.compare(password, foundUser.password)
    const match = password == foundUser.password ? true : false

    if (!match) return res.status(401).json({ message: 'Unauthorized' })

    const accessToken = jwt.sign(
        {
                "email": foundUser.email,
                "name": foundUser.name,
                "firstName":foundUser.firstName,
                 "lastName":foundUser.lastName
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '50m' }
    )

    const refreshToken = jwt.sign(
        { "email": foundUser.email,"name" : foundUser.name, "firstName":foundUser.firstName, "lastName":foundUser.lastName },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '50m' }
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: false, //accessible only by web server 
        secure: false, //https
        // sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT 7days
    })

    // Send accessToken containing email and roles 
    res.send({ accessToken })
})

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
    console.log("cokies",req.cookies)
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            console.log(err)
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findOne({ email: decoded.email }).exec()

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": foundUser.email,"name" : foundUser.name, "firstName":foundUser.firstName, "lastName":foundUser.lastName 
                        
                        // "roles": foundUser.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '50m' }
            )

            res.json({ accessToken })
        })
    )
}

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies
    // if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('session', { httpOnly: true, sameSite: 'None', secure: true })

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
    // req.logout();
    // res.json({ message: 'Cookie cleared' })

}

const googleAuthSuccess = (req,res) =>{
    const cookies = req
    console.log("reqreq=====?>??????",req.user)
    if(req.user){
        res.json({googleAuthToken:cookies.session})

    }else{
        return res.status(401).json({ message: 'Unauthorized' })
    }
}

module.exports = {
    login,
    refresh,
    logout,
    googleAuthSuccess
}