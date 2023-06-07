const express = require('express');
const CursoController = require("../controllers/course.controller");
const multipart  = require('connect-multiparty');
const md_auth = require("../middlewares/authenticated");

const md_upload = multipart({uploadDir: "./uploads/course"} )
const api = express.Router();

api.post("/course",[md_auth.asureAuth,md_upload],CursoController.createCourse)

module.exports = api;