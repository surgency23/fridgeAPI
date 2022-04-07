const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fridgeSchema = new Schema({
    fridgeName:{
        type:String,
        require:true
    }
});
module.exports = mongoose.model('Fridge',fridgeSchema);