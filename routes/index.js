const express = require('express');
const actions = require('../methods/actions');
const router = express.Router();
const passport = require('passport')
require('../config/passport')(passport)



router.get("/", function(req,res){
    res.json({success:true, msg: "hello world!"})
});
router.post("/signup", actions.signup);

//@description authenticate user and return token
//@route POST /authenticate
router.post("/authenticate", actions.authenticate);

//@description protected route, get user information after verifying token
//@route GET /getinfo
router.get("/getinfo",actions.getinfo);

//@description grab next 30 recipes
//@route GET /grabRecipes
router.post("/grabRecipes",actions.grabRecipes);

//router.get("/loadInRecipes",actions.loadInRecipes);
module.exports = router;