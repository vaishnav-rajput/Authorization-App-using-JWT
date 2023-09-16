const bcrypt = require("bcrypt")
const User = require("../models/user");
const jwt = require("jsonwebtoken")

require("dotenv").config()

//signup route handler
exports.signup = async(req,res) => {
    try {
        //get data
        const {name, email, password, role} = req.body;

        //check if user already exist
         const existingUser = await User.findOne({email})
         if(existingUser){
            return res.status(400).json({
                success: false,
                message: "user already exists"
            })}
        
        //secure password    
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10)
        }
        catch(err) {
            return res.status(500).json({
                success: false,
                message: "error in hashing password"
            })
        }

        //create entry for User
        const user = await User.create({
            name, email, password: hashedPassword, role
        })

        return res.status(200).json({
            success: true,
            message: "User Created"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "user cannot be registered, please try again later"
        })
    }
}


//login handler
exports.login = async(req, res) => {
    try {
        //data fetch
        const {email, password} = req.body

        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "please fill all the details"
            })
        }

        //check for registered user
        const user = await User.findOne({email})

        //if not a registered user
        if(!user){
            return res.status(401).json({
                success: false,
                message: "user is not registered"
            })
        }

        const payload = {
            email:user.email,
            id: user._id,
            role: user.role
        }
        
        //verify password and generate a JWT token
        if(await bcrypt.compare(password, user.password)){
            //password match
            let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "2h",})

  
        }else{
            //password do not match
            return res.status(403).json({
                success: false,
                message: "password incorrect"
            })
        }


    } catch (error) {
        
    }
}