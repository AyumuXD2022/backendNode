const moongose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

const PostSchema = moongose.Schema({
    title : String,
    miniature:String,
    content:String,
    path : {
        type:String,
        unique: true,
    },
    create_at:Date
});
PostSchema.plugin(mongoosePaginate);

module.exports = moongose.model("Post",PostSchema);