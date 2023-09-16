//auth , isStudent, isAdmin

const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.auth = (req, res, next) => {
    try {
        //extract JWT token
        const token = req.body.token || req.cookies.token
    } catch (error) {
        
    }
} 
 