const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('./dbconfig')


const passportJWTOptions = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret,
    // issuer: 'enter issuer here',
    // audience: 'enter audience here',
    //algorithms: ['RS256'],
    ignoreExpiration: false,
    passReqToCallback: false,
    jsonWebTokenOptions: {
        maxAge: config.maxAge, // 2 days
    }
}
module.exports = (passport) => {
    // The JWT payload is passed into the verify callback
    passport.use(new jwtStrategy(passportJWTOptions, function(jwt_payload, done) {
        // Since we are here, the JWT is valid!
        
        // We will assign the `sub` property on the JWT to the database ID of user
        User.findOne({_id: jwt_payload.sub}, function(err, user) {
            
            // This flow look familiar?  It is the same as when we implemented
            // the `passport-local` strategy
            if (err) {
                return done(err, false);
            }
            if (user) {
                // Since we are here, the JWT is valid and our user is valid, so we are authorized!
                return done(null, user);
            } else {
                return done(null, false);
            }
            
        });
        
    }));
}