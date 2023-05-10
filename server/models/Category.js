const mongoose = require('mongoose');
const {Schema} = mongoose;

const categorySchema = new Schema ({
    name:{
        type:String,
        required:'Należy wypełnić'
    },
    image:{
        type:String,
        required:'Należy wypełnić'
    },
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category;