const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('./dbconfig')


// const passportJWTOptions = {
//     jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: config.secret,
//     // issuer: 'enter issuer here',
//     // audience: 'enter audience here',
//     //algorithms: ['RS256'],
//     ignoreExpiration: false,
//     passReqToCallback: false,
//     jsonWebTokenOptions: {
//         maxAge: config.maxAge, // 2 days
//     }
// }
module.exports = (passport) => {
    let opts = {};

    opts.secretOrKey=config.secret;
    opts.jwtFromRequest = extractJwt.fromAuthHeaderWithScheme('jwt');
    passport.use(new jwtStrategy(opts,function(jwt_payload,done){
        User.find({
            id:jwt_payload.id
        },function (err,user){
            if(err){
                return done(err,false);
            }
            if(user){
                return done(null,user);
            }
            else {
                return done(null,false);
            }
        });

    }));
}