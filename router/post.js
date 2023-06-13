const md_auth = require("../middlewares/authenticated");
const express = require('express');
const multipart  = require('connect-multiparty');
const PostController = require("../controllers/post.controller");

const md_upload = multipart({uploadDir: "./uploads/blog"} )

const api = express.Router();

api.post("/post", [md_auth.asureAuth,md_upload] , PostController.createPost);
api.get("/post", PostController.getPosts);
api.patch("/post/:id", [md_auth.asureAuth,md_upload] , PostController.updatePost);



module.exports = api;