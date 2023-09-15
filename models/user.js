const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["Admin", "Student", "Visitor"] //using enum means it will only accept the value within these three values
    }
})

module.exports = mongoose.model("user", userSchema)