import exprees from "express"
//import mongoose from "mongoose";
const app=exprees();
app.get('/',function(req,res){
    res.send("hello its working");
})
app.listen(3000);