const Post = require("../models/post.model");
const image = require("../utils/image")
const fs = require('fs')

const createPost = async (req, res) => {
    const post = new Post(req.body);
    post.create_at = new Date();

    
    const imagePath = image.getFilePath(req.files.miniature)
    post.miniature = imagePath

    try {
        const postStored = await post.save();
        res.status(201).send(postStored);
    } catch (error) {
        res.status(400).send({ msg: "Error al crear un post" });
    }
}

const getPosts = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const options = {
        page: parseInt(page),
        limit: parseInt(limit)
    }
    Post.paginate({}, options, (error, posts) => {
        if (error) {
            res.status(400).send({ msg: "Error al obtener un recurso" });
        } else {
            res.status(200).send(posts);
        }
    })
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    
    const postData = req.body;
   
    
    try {
        const response = await Post.findByIdAndUpdate({ _id: id },postData)
        if(response.miniature){
            fs.unlinkSync(`./uploads/${response.miniature}`)
        }
        
        res.status(200).send({ msg: "Actualizacion correcta" });
    } catch (error) {
        console.log(error)
        res.status(400).send({ msg: "Error al actualizar" });
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Post.findByIdAndDelete(id);
        if(response.miniature){
            fs.unlinkSync(`./uploads/${response.miniature}`)
        }
        res.status(200).send({ msg: "Post eliminado" });
    } catch (error) {
        res.status(400).send({ msg: "Error al eliminar el post" });
    }
}

const getPost = async (req, res) => {
    const { path } = req.params;
    try {
        const postStored = await Post.findOne({ path }).exec();
        if(!postStored){
            res.status(400).send({ msg: "No se ha encontrado ningun post" });
        }else{
            res.status(200).send(postStored);
        }
    } catch (error) {
        res.status(500).send({ msg: "Error del servidor" });
    }

} 

module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    getPost
}