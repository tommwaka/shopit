import jwt from 'jsonwebtoken'

// Verify user access token
export const verifyToken = (req, res, next) => {
    const {token} = req.headers
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) res.status(403).json("Invalid token")
            req.user = user
            next()
        } )
    } else {
        return res.status(401).json("You're not authenticated")
    }
}

// Authorize users based on access token
export const tokenAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === id || req.user.isAdmin ) {
            next()
        } else {
            res.status(403).json("Unauthorized action")
        } 
    })
}