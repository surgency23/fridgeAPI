require('dotenv').config()
module.exports={
    secret:process.env.JWT_SECRET,
    database: process.env.DATABASE_CONN,
    maxAge:"1d"
}
