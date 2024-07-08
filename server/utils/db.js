const mongoose = require("mongoose");

//const URI = "mongodb://localhost:27017/mern_react_admin";
// mongoose.connect(URI);
//const URI = "mongodb+srv://saniya:BQxTcgjTzzi9XhjR@cluster0.0bcs0rp.mongodb.net/mern_admin?retryWrites=true&w=majority&appName=Cluster0";
const URI = process.env.MONGODB_URI;

const connectDB = async() => {
    try{
        await mongoose.connect(URI);
        console.log("Connection successful to Database");
    }
    catch(error){
        console.error("Database connection failed");
        process.exit(0);
    }
}

module.exports = connectDB;