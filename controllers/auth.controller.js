const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require("../utils/jwt")


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

async function login (req,res){
    const {email, password }  = req.body;

    if(!email) res.status(400).send({msg:"El email es obligatorio"});
    if(!password) res.status(400).send({msg:"El password es obligatorio"});

    const emailLowerCase = email.toLowerCase();

    try {
        const response = await User.findOne({ email: emailLowerCase })
        bcrypt.compare(password, response.password, (bcryptError, check) => {
            if(bcryptError){
                res.status(500).send({msg:"Error del servidor"});
            }else if (!check){
                res.status(400).send({msg:"Contraseña incorrecta"});
            }else if(!response.active){
                res.status(400).send({msg:"Usuario no autorizado o no activo"});
            }else{
                res.status(200).send({
                    access : jwt.createAccessToken(response),
                    refres :jwt.createRefreshToken(response)
                });
            }
        })
    } catch (error) {
        res.status(500).send({msg:"Error del servidor"});
    }
}

async function refreshAccessToken(req,res){
    const { token } = req.body;
    if(!token) res.status(400).send({msg:"El token es obligatorio"});
    
    try {
        const { user_id } = jwt.decoded(token)
        const userStorage = await User.findOne({ _id: user_id })
        res.status(200).send({
            accessToken : jwt.createAccessToken(userStorage)
        });
    } catch (error) {
        res.status(500).send({msg:"Error del servidor"});
    }
    const { user_id } = jwt.decoded(token)


}



module.exports = {
    register,
    login,
    refreshAccessToken
}