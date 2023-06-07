const moongose = require("mongoose");

const CourseSchema = moongose.Schema({
    title : String,
    path : String,
    order: Number,
    active: Boolean
})

module.exports = moongose.model("Course",CourseSchema);