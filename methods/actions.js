const User = require('../models/user');
const Fridge = require('../models/fridge');
const jwt = require('jsonwebtoken');
const config = require("../config/dbconfig");
const issueJWT = require("../config/utils");

const functions = {
    signup: function (req, res) {
        if (!(req.body.email) || !(req.body.password) || !(req.body.fridgeName)) {
            if (!(req.body.email)) res.json({
                success: false,
                msg: "Enter email"
            });
            if (!(req.body.password)) res.json({
                success: false,
                msg: "Enter password"
            });
            if (!(req.body.fridgeName)) res.json({
                success: false,
                msg: "Enter fridge name"
            });
        } else {
            let newFridge = Fridge({
                fridgeName: req.body.fridgeName
            })
            let newUser = User({
                email: req.body.email,
                password: req.body.password,
                fridgeID: newFridge._id
            });
            newUser.save(function (err, newUser) {
                if (err) {
                    res.json({
                        success: false,
                        msg: "Failed to save"
                    });
                } else {
                    newFridge.save(function (err) {
                        if (err) return res.json({
                            success: false,
                            msg: "Failed to save fridge!"
                        })
                        res.json({
                            success: true,
                            msg: "Successfully saved"
                        })
                    });
                }
            })
        }
    },
    authenticate: function (req, res) {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) throw (err);
            if (!user) {
                res.status(403).send({
                    success: false,
                    msg: "Authentication failed. User not found"
                })
            } else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {

                        const tokenObject = issueJWT(user);
                        console.log(tokenObject)
                        res.status(200).json({success:true, token:tokenObject.token,expiresIn:tokenObject.expires})
                    } else {
                        res.status(403).send({
                            success: false,
                            msg: "Authentication failed. Wrong password"
                        });
                    }
                });
            }
        })
    },
    getinfo: async function (req, res) {
        return res.json({
            success: true,
            msg: "happy path"
        });

    }
    
}
module.exports = functions

/***
 * 
 * 
 * const User = require('../models/user');
const Fridge = require('../models/fridge');
const jwt = require('jsonwebtoken');
const config = require("../config/dbconfig");

const functions = {
    addNew: function (req, res) {
        if (!(req.body.name) || !(req.body.password) || !(req.body.fridgeName)) {
            if (!(req.body.name)) res.json({
                success: false,
                msg: "Enter name"
            });
            if (!(req.body.password)) res.json({
                success: false,
                msg: "Enter password"
            });
            if (!(req.body.fridgeName)) res.json({
                success: false,
                msg: "Enter fridge name"
            });
        } else {
            let newFridge = Fridge({
                fridgeName: req.body.fridgeName
            })
            let newUser = User({
                name: req.body.name,
                password: req.body.password,
                fridgeID: newFridge._id
            });
            newUser.save(function (err, newUser) {
                if (err) {
                    res.json({
                        success: false,
                        msg: "Failed to save"
                    });
                } else {
                    newFridge.save(function (err) {
                        if (err) return res.json({
                            success: false,
                            msg: "Failed to save fridge!"
                        })
                        res.json({
                            success: true,
                            msg: "Successfully saved"
                        })
                    });
                }
            })
        }
    },
    authenticate: function (req, res) {
        User.findOne({
            name: req.body.name
        }, function (err, user) {
            if (err) throw (err);
            if (!user) {
                res.status(403).send({
                    success: false,
                    msg: "Authentication failed. User not found"
                })
            } else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        let token = jwt.sign(user.toJSON(),config.secret,{ expiresIn: 30});
                        //.(user, config.secret);
                        res.json({
                            success: true,
                            token: token,
                            msg: "User Authenticated"
                        });
                    } else {
                        res.status(403).send({
                            success: false,
                            msg: "Authentication failed. Wrong password"
                        });
                    }
                });
            }
        })
    },
    getInfo: function (req, res) {
        let tokenObj=validateToken(req);
        if(tokenObj.validToken === true) return res.json({
            success: true,
            msg: 'Hello ' + tokenObj.token.name
        });
        else return res.json({
            success: false,
            msg: 'No Headers'
        });
    }
}
function validateToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        let token = req.headers.authorization.split(' ')[1];
        let decodedToken = jwt.verify(token,config.secret);
        //.verify(token, config.secret);
        return {validToken:true,token:decodedToken}
    }else{
        return {validToken:false,token:null}
    }
}
module.exports = functions
 */