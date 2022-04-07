const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        reqiure:true
    },
    fridgeID:{
        type:String,
        reqiure:true
    },
});

userSchema.pre('save',function(next){
    const user = this;
    if(this.isModified('password')||this.isNew){
        bcrypt.genSalt(12,function(err,salt){
            if(err){
                return next(err);
            }
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err){
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    }
    else return next();
});

userSchema.methods.comparePassword = function(pass, cb){
    bcrypt.compare(pass,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch)
    });
}
module.exports = mongoose.model('User',userSchema);