const mongoose = require('mongoose');
const {Schema} = mongoose;

const recipeSchema = new Schema ({
    name:{
        type:String,
        required:'Należy wypełnić'
    },
    decription:{
        type:String,
        require:'Należy wypełnić',
    },
    email:{
        type:String,
        require:'Należy wypełnić',
    },
    ingredients:{
        type:Array,
        require:'Należy wypełnić',
    },
    category:{
        type:String,
        enum:['Thai', 'American', 'Chinese', 'Mexican', 'Indian'],
        require:'Należy wypełnić',
    },
    image:{
        type:String,
        require:'Należy wypełnić',
    },
})

const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = Recipe;

