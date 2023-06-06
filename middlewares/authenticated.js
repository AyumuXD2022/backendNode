const jwt = require("../utils/jwt");

function asureAuth( req, res, next) {
    if(!req.headers.authorization){
        return res.status(403).send({msg : "La peticion no tiene la cabecera de autenticacion"})
    }
    

    const token = req.headers.authorization.replace("Bearer ","");

    try {
        const payload = jwt.decoded(token);
        console.log(payload)

        const { exp } = payload;
        const currentData = new Date().getTime();

        if(exp <= currentData){
            return res.status(403).send({msg : "Token ha expirado"})
        }

        req.user = payload
        next();
        
    } catch (error) {
        return res.status(403).send({msg : "Token invalido"})
    }
}

module.exports = {
    asureAuth
}