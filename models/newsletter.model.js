const moongose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

const NewsletterSchema =  moongose.Schema({
    email: {
        type:String,
        unique: true,
    }
})
NewsletterSchema.plugin(mongoosePaginate);
module.exports = moongose.model("Newsletter",NewsletterSchema);