const moongose = require("mongoose");

const CourseSchema = moongose.Schema({
    title : String,
    miniature:String,
    description:String,
    url : String,
    price: Number,
    score: Number
})

module.exports = moongose.model("Course",CourseSchema);