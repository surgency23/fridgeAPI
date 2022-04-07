require('dotenv').config()
module.exports={
    secret:process.env.JWT_SECRET,
    database: `mongodb+srv://${DATABASE_USER}:${DATABASE_PASS}@${DATABASE_NAME}.u7n18.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`,
    maxAge:"1d"
}
