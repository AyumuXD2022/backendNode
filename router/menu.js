const express = require('express');
const MenuController = require("../controllers/menu.controller")
const md_auth = require("../middlewares/authenticated")

const api = express.Router();

api.post("/menu",[md_auth.asureAuth], MenuController.createMenu)
api.get("/menu", MenuController.getMenus)
api.post("/menu/:id", [md_auth.asureAuth] , MenuController.updateMenu);
api.delete("/menu/:id", [md_auth.asureAuth] , MenuController.deleteMenu);
module.exports = api;