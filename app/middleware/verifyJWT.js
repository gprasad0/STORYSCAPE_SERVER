const jwt = require('jsonwebtoken')
const getUserByOauthId = require('../controllers/userController').getUserByOauthId;
const verifyJWT = async (req, res, next) => {

    if(req.cookies && req.cookies.session){
        console.log("req.cookies",req.cookies,req.user)
      let user =  await getUserByOauthId(req.user)
      if(user.length > 0){
        next()
      }else{
        return res.status(401).json({ message: 'Unauthorized' })

      }


    }else{
        const authHeader = req.headers.authorization || req.headers.Authorization
        console.log("token==>",authHeader)
        console.log("cookies===>",req.cookies)
    
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
    
        const token = authHeader.split(' ')[1]
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                console.log("err-->",decoded,err)
                if (err) return res.status(403).json({ message: 'Forbidden' })
                req.email = decoded.email
                req.name = decoded.name
                next()
            }
        )
    }
    
}

module.exports = verifyJWT 