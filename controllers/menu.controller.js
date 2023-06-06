const Menu = require("../models/menu.model")

async function createMenu(req, res) {


    try {
        const menu = new Menu(req.body)
        const menuStored = await menu.save();
        res.status(200).send(menuStored);
    } catch (error) {
        res.status(400).send({ msg: "Error al crear el menus" });
    }

}

async function getMenus(req, res) {
    const { active } = req.query;


    let response = null;
    if (active === undefined) {
        response = await Menu.find().sort({order: "asc"});
    } else {
        response = await Menu.find({ active }).sort({order: "asc"});
    }

    if (!response) {
        res.status(400).send({ msg: "No se ha encontrado ningun valor" });
    } else {
        res.status(200).send(response);
    }

}

async function updateMenu(req, res) {
    const { id } = req.params;
    const menuData = req.body;


    try {
        await Menu.findByIdAndUpdate({ _id: id }, menuData);
        res.status(200).send({ msg: "Actualizacion correcta" });
    } catch (error) {
        res.status(400).send({ msg: "Error al actualizar el Menu" });
    }
}

async function deleteMenu(req, res) {
    const { id } = req.params;
    try {
        await Menu.findByIdAndDelete(id)
        
        res.status(200).send({ msg: "Menu eliminado" });
    } catch (error) {
        res.status(400).send({ msg: "Error al eliminar el Menu" });
    }
}

module.exports = {
    createMenu,
    getMenus,
    updateMenu,
    deleteMenu
}