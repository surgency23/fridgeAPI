require('dotenv').config()
module.exports={
    secret:process.env.JWT_SECRET,
    database:DATABASE_CONN,
    maxAge:"1d"
}
