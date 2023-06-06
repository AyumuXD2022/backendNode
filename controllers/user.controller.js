const User = require("../models/user.model")
const bcrypt = require('bcryptjs');
const image = require("../utils/image")
const fs = require('fs')

async function getMe (req,res){
    const { user_id } = req.user;
    try {
        const response = await User.findById(user_id)
        res.status(200).send(response)
    } catch (error) {
        res.status(400).send({msg : "No se ha encontrado usuario"})
    }
    
}

async function getUsers(req,res){
    const { active } = req.query;
    let response = null;
    if(active === undefined){
        response = await User.find();
    }else{
        response = await User.find({active});
    }
    
    if(!response){
        res.status(400).send({msg:"No se ha encontrado ningun valor"});
    }else{
        res.status(200).send(response);
    }
}

async function createUser(req,res){
    const { password } = req.body;
    const user = new User({...req.body,active:false})

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password,salt);
    user.password = hashPassword;

    
    if(req.files.avatar){
        const imagePath = image.getFilePath(req.files.avatar)
        user.avatar = imagePath
    }

    try {
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send({msg:"Error al crear un usuario"});
    }
}

async function updateUser(req,res){
    const { id } = req.params;
    const userData = req.body;

    if(userData.password){
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(userData.password, salt);
        userData.password = hashPassword
    }else{
        delete userData.password;
    }

    if(req.files.avatar){
        const imagePath = image.getFilePath(req.files.avatar)
        userData.avatar = imagePath
    }

    try {
        const response = await User.findByIdAndUpdate({ _id: id }, userData);
        if(response.avatar){
            fs.unlinkSync(`./uploads/${response.avatar}`)
        }
        res.status(200).send({ msg: "Actualizacion correcta" });
    } catch (error) {
        res.status(400).send({ msg: "Error al actualizar el usuario" });
    }

}

async function deleteUser(req,res){
    const { id } = req.params;
    try {
        const response = await User.findByIdAndDelete(id)
        if(response.avatar){
            fs.unlinkSync(`./uploads/${response.avatar}`)
        }
        res.status(200).send({ msg: "Usuario eliminado" });
    } catch (error) {
        res.status(400).send({ msg: "Error al eliminar el usuario" });
    }
}



//../uploads/avatar
module.exports = {
    getMe,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}