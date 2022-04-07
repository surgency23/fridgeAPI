const mongoose = require("mongoose");
const dbConfig = require("./dbconfig");

const connectDB = async() =>{
    console.log("Attempting to connect to Mongo DB")
    try{
        const conn = await mongoose.connect(dbConfig.database,{
            useNewURLParser:true,
            useUnifiedTopology:true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch(err){
        console.log(`MongoDB could not connect!`);
       process.exit(1);
    }
}
module.exports = connectDB;