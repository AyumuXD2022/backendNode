const moongose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

const CourseSchema = moongose.Schema({
    title : String,
    miniature:String,
    description:String,
    url : String,
    price: Number,
    score: Number
});
CourseSchema.plugin(mongoosePaginate);

module.exports = moongose.model("Course",CourseSchema);