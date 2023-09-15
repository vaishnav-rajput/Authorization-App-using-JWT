const bcrypt = require("bcrypt")
const User = require("../models/user");
const user = require("../models/user");


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
            })
         }
    } catch (error) {
        
    }
}