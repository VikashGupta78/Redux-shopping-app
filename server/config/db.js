require("dotenv").config();
const mongoose = require("mongoose");

const mongo_url = "mongodb+srv://vikashkg12:1327@cluster2.6qhup.mongodb.net/auth-demo?retryWrites=true&w=majority&appName=Cluster2";

mongoose.connect(mongo_url)
    .then(()=>{
        console.log("mongoDb successfully connected");
    })
    .catch((err)=>{
        console.log("mongo connection failed: ", err);
    });  