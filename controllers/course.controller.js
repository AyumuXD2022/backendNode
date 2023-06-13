const Course = require("../models/course.model")
const image = require("../utils/image")
const fs = require('fs')

const creationCourse = async (req, res) => {
    const course = new Course(req.body);
    const imagePath = image.getFilePath(req.files.miniature)
    course.miniature = imagePath
    try {
        await course.save();
        res.status(200).send(course);
    } catch (error) {
        res.status(400).send({ msg: "Error al crear un recurso" });
    }
}

const getCourse = async (req, res) => {
    const { page = 1, limit = 10 } = req.query
    const options = {
        page: parseInt(page),
        limit: parseInt(limit)
    }
    Course.paginate({}, options, (error, courses) => {
        if (error) {
            res.status(400).send({ msg: "Error al obte un recurso" });
        } else {
            res.status(200).send(courses);
        }
    })
}
const updateCourse = async (req, res) => {
    const { id } = req.params;
    const courseData = req.body;
    if(req.files.miniature){
        const imagePath = image.getFilePath(req.files.miniature)
        courseData.miniature = imagePath
    }

    try {
        const response = await Course.findByIdAndUpdate({ _id: id }, courseData);
        if(response.miniature){
            fs.unlinkSync(`./uploads/${response.miniature}`)
        }
        res.status(200).send({ msg: "Actualizacion correcta" });
    } catch (error) {
        res.status(400).send({ msg: "Error al actualizar el curso" });
    }
}

const deleteCourse = async(req,res) =>{
    const { id } = req.params;
    try {
        const response = await Course.findByIdAndDelete(id);
        if(response.miniature){
            fs.unlinkSync(`./uploads/${response.miniature}`)
        }
        res.status(200).send({ msg: "Curso eliminado" });
    } catch (error) {
        res.status(400).send({ msg: "Error al eliminar el curso" });
    }
}



module.exports = {
    creationCourse,
    getCourse,
    updateCourse,
    deleteCourse
}

