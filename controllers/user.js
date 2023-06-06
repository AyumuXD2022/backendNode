const User = require("../models/user.model")
async function getMe (req,res){
    const { user_id } = req.user;
    try {
        const response = await User.findById(user_id)
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send({msg : "No se ha encontrado usuario"})
    }
    
}

module.exports = {
    getMe
}