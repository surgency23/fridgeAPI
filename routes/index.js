const express = require('express');
const actions = require('../methods/actions');
const router = express.Router();
const passport = require('passport')
require('../config/passport')(passport)



// const authorization = (req, res, next) => {
//     const token = req.cookies.access_token;
//     if (!token) {
//         return res.sendStatus(403);
//     }
//     try {
//         let token = jwt.sign(user.toJSON(), config.secret /*,{ expiresIn: 30}*/ );
//         req.userId = data.id;
//         req.userRole = data.role;
//         return next();
//     } catch {
//         return res.sendStatus(403);
//     }
// };
//@description Adding new user
//@route POST /adduser
router.post("/signup", actions.signup);

//@description authenticate user and return token
//@route POST /authenticate
router.post("/authenticate", actions.authenticate);

//@description protected route, get user information after verifying token
//@route GET /getinfo
router.get("/getinfo",passport.authenticate('jwt', { failureRedirect: '/login', failureMessage: false ,session: false}), actions.getinfo)

module.exports = router;