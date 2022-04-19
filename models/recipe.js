const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeScheme = new Schema({
    tags:{
        type:Array,
        require:true
    },
    servings:{
        type:String,
        require:false
    },
    recipeSource:{
        type:String,
        require:false
    },
    imageSource:{
        type:String,
        require:false
    },
    image:{},
    instructions:{
        type:String,
        require:true
    },
    ingredients:{
        type:Array,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    parsedIngredients:{type:Array,require:false}
});
module.exports = mongoose.model('Recipe',recipeScheme);