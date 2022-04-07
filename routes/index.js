const express = require('express');
const actions = require('../methods/actions');
const router = express.Router();
const passport = require('passport')
require('../config/passport')(passport)



router.post("/", function(req,res){
    res.json({success:true, msg: "hello world!"})
});
router.post("/signup", actions.signup);

//@description authenticate user and return token
//@route POST /authenticate
router.post("/authenticate", actions.authenticate);

//@description protected route, get user information after verifying token
//@route GET /getinfo
router.get("/getinfo",passport.authenticate('jwt', { failureRedirect: '/login', failureMessage: false ,session: false}), actions.getinfo)

module.exports = router;