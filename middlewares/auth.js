//auth , isStudent, isAdmin

const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.auth = (req, res, next) => { //here next is passed so the middleware can move to the next method i.e. isStudent, isAdmin
    try {
        //extract JWT token
        const token = req.body.token 

        if(!token){
            return res.status(401).json({
                success: false,
                message: "token missing"
            })
        }

        //verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decode)
            req.user = decode
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

    }
}