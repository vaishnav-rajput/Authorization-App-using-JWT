const express = require("express")
const router = express.Router()
const User = require("../models/user")

const {login, signup} = require("../controllers/auth")
const {auth, isAdmin, isStudent} = require("../middlewares/auth")

router.post("/login", login)
router.post("/signup", signup)

//testing protected routes for single middleware
router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: "welcome to the protected route for TESTS"
    })
})

//protected route
router.get("/student", auth, isStudent, (req,res) => {
    res.json({
        success: true,
        message:"Welcome to the protected route for students"
    })
})

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "welcome to the protected route for admin"
    })
})

router.get("/getEmail", auth, async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findOne({id})

        res.status(200).json({
            success: true,
            user: user,
            message: "welcome to the email route"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "code did not work"
        })
    }

  

} )

module.exports = router