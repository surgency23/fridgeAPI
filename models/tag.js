const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagScheme = new Schema({
    tagName:{
        type:String,
        require:true
    }
});
module.exports = mongoose.model('Tag',tagScheme);