//auth , isStudent, isAdmin

const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.auth = (req, res, next) => { //here next is passed so the middleware can move to the next method i.e. isStudent, isAdmin
    try {
        //extract JWT token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "")

        if(!token){
            return res.status(401).json({
                success: false,
                message: "token missing"
            })
        }

        //verify the token 
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            console.log(payload)
            req.user = payload
        } catch(err) {
            return res.status(401).json({
                success: false,
                message: "token is invalid"
            })
        }
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "something went wrong, while verifying the token"
        })
    }
} 
    

exports.isStudent = (req,res,next) => {
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success: "false",
                message: "this is a protected route for students"
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "user role is not matching"
        })
    }
}

exports.isAdmin = (req, res, next)  => {
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success: "false",
                message: "this is a protected route for Admin "
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "user role is not matching"
        })
    }
}