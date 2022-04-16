const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeScheme = new Schema({
    recipe:{
        type:String,
        require:true
    }
});
module.exports = mongoose.model('Recipe',recipeScheme);