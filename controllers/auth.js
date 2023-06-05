const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
async function register(req,res){
    const { firsname,lastname, email, password } = req.body;

    if(!email) res.status(400).send({msg:"El email es obligatorio"});
    if(!password) res.status(400).send({msg:"El password es obligatorio"});

    const user = new User({
        firsname,
        lastname,
        email:email.toLowerCase(),
        role: "user",
        active: false,
        password,
    })

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password,salt);
    user.password = hashPassword;

    try{
        await user.save();
        res.status(200).send({msg:"Usuario guardado"});
    } catch (err){
        res.status(400).send({msg:"Error al crear un usuario"});
    }
}


module.exports = {
    register,
}