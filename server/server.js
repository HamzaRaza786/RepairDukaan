require("dotenv").config();
const express = require("express");
const app = express();
const path = require('path')
const cors=require("cors");
const mongoose = require('mongoose');
//const User = require('./models/User');
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open',() => {
    console.log("MongoDB database connection established successfully");
});
app.use(express.json());
app.use(cors());
app.use('/', express.static(path.join(__dirname, 'static')))
//ROUTES//
//register and login routes
const port = process.env.PORT;
app.use("", require("./routes/Customers/start"));
app.use("",require("./routes/Customers/getProfile"));
app.use("",require("./routes/Customers/updateProfile"));
app.use("",require("./routes/Repairs/handleCancel"));
app.use("",require("./routes/Repairs/handleSubmit"));
app.use("",require("./routes/Workers/workers"));
app.listen(port,() =>{
    console.log('server is working on port ',port);
}); 