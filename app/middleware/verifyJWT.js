const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    console.log("token==>",authHeader.split(' '))

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

module.exports = verifyJWT 