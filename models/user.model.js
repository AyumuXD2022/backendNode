const moongose = require("mongoose");

const UserSchema = moongose.Schema({
    firsname : String,
    lastname : String,
    email: {
        type:String,
        unique: true,
    },
    password: String,
    role:String,
    active: Boolean,
    avatar:String
})

module.exports = moongose.model("User",UserSchema);