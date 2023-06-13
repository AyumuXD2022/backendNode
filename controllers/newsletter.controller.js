const Newsletter = require("../models/newsletter.model")

const createEmail = async (req,res) => {
    const { email } = req.body;
    if (!email) res.status(400).send({ msg: "El email es obligatorio" });
    const newsletter = new Newsletter({
        email: email.toLowerCase()
    });
    try {
        newsletter.save();
        res.status(200).send({ msg: "El email registrado" });
    } catch (error) {
        res.status(400).send({ msg: "El email ya se encuentra registrado" });
    }
}
const getEmails = async (req,res) => {
    const { page = 1, limit = 10 } = req.query;
    const options = {
        page: parseInt(page),
        limit: parseInt(limit)
    }

    Newsletter.paginate({}, options, (error, newsletter) => {
        if (error) {
            res.status(400).send({ msg: "Error al obtener un recurso" });
        } else {
            res.status(200).send(newsletter);
        }
    })
}

const deleteEmail = async  (req,res) => {
    const { id } = req.params;
    try {
        await Newsletter.findByIdAndDelete(id);
        res.status(200).send({ msg: "Email eliminado" });
    } catch (error) {
        res.status(400).send({ msg: "Error al eliminar el email" });
    }
}

module.exports = {
    createEmail,
    getEmails,
    deleteEmail
}