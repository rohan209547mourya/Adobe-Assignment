const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

const auth = role => {
    return (req, res, next) => {

        const token = req.header("x-auth-token");

        if(!token) return res.status(401).json({
            message: "x-auth-token header not found",
            code: 401
        })

        try {
            
            const decoded = jsonwebtoken.verify(token, process.env.JWT_SECERT || "temp_key")
            if(role && role !== decoded.role) return res.status(403).json({
                message: "Access denied. You are not authorized to access this resource!",
                code: 403
            })
            req.user = decoded
            next()
        } 
        catch (err) {
            res.status(400).json({
                message: "Invalid token",
                code: 400
            })      
        }
    }
}

module.exports = auth