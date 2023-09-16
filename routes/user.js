const express = require("express")
const router = express.Router()

const {login, signup} = require("../controllers/auth")
const {auth, isAdmin, isStudent} = require("../middlewares/auth")

router.post("/login", login)
router.post("/signup", signup)


//protected route
router.get("/student", auth, isStudent, (req,res) => {
    res.json({
        success: true,
        message:"Welcome"
    })
})

module.exports = router