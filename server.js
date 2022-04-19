const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const passport = require("passport");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const routes = require('./routes/index');


connectDB()
const app = express();
if(process.env.NODE_ENV==="development"){
    app.use(morgan("dev"))
}

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use(express.json());
app.use(routes);
app.use(passport.initialize());
require("./config/passport")(passport);



const PORT = process.env.PORT || 3000
app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));