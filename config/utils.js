const jsonwebtoken=require('jsonwebtoken');
const config = require('./dbconfig')

module.exports= function issueJWT(user){
    const _id = user._id;
    const expiresIn = '1h';

    const payload={
        sub:_id,
        iat: Math.floor(Date.now / 1000)
    }
    console.log(payload)
    const signedToken = jsonwebtoken.sign(payload,config.secret,{ expiresIn: expiresIn});

    return {
        token:"Bearer " + signedToken,
        expires: expiresIn
    }
}