const User = require('../models/user');
const Fridge = require('../models/fridge');
const Tag = require('../models/tag');
const Recipe = require('../models/recipe');
const jwt = require('jsonwebtoken');
const config = require("../config/dbconfig");
const issueJWT = require("../config/utils");
let allRecipes = [];
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
                fridgeID: newFridge._id,
                passwordUpdateTime: Date.now()
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
                        res.status(200).json({
                            success: true,
                            token: tokenObject.token,
                            expiresIn: tokenObject.expires
                        })
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
    getinfo: function (req, res) {
        authenticateToken(req,res);
        return res.json({success:true,msg:"henlo!"})
    },
    loadInRecipes: async function (req, res) {
        authenticateToken(req,res);
        for (let recipe of allRecipes) {
            let tagIds=[];
            for(let tag of recipe.tags){
                await Tag.findOne({
                    tagName : tag
                }).then((value) =>{
                    //if there is no existing tag, save it, and push it
                    if(!value) {
                        let newTag = Tag({
                            tagName: tag
                        })
                        newTag.save(function (err, newTag) {
                            if(err) throw(err);
                        });
                        tagIds.push(newTag._id.toString());
                        //tag exists, grab tag id and push it
                    }else tagIds.push(value._id.toString());
                });
            }
            let newRecipe = Recipe({
                tags: tagIds,
                servings: recipe.servings,
                recipeSource: recipe.recipeSource,
                imageSource: recipe.imageSource,
                image: recipe.image,
                instructions: recipe.instructions,
                ingredients: recipe.ingredients,
                title: recipe.title,
                parsedIngredients: recipe.parsedIngredients,
                
            });
             newRecipe.save(function (err) {
                if (err) console.log("Failed to RECIPE");
            })
        }
        res.json({
            success: true,
            msg: "Saved all recipes"
        });
    },
    grabRecipes: async function(req,res){
        let opts = req.body.lastId === undefined ? null : {_id: {$gt: req.body.lastId}}
        return res.json({
            success:true,
            recipes: await Recipe.find(opts).limit(30)
        });
    }
}
function authenticateToken(req,res) {
    try{
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === "Bearer") {
            let token = req.headers.authorization.split(' ')[1];
            jwt.verify(token,config.secret);
        }
        else{
            throw(new Error("No headers exist!"));
        }
    }
    catch(e){
        return res.json({
            success:false,
            msg: e.message
        });
    }
}
module.exports = functions