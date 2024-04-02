const express=require("express");
const fs=require("fs");
const path = require("path");
const userData=require("./userData.json");
const app=express();


app.use(express.static(path.join(__dirname, "/")));
app.use(express.urlencoded({extended:'false'}));
app.use(express.static("./"));  

app.get("/",(req,res)=>{
    // res.send("home");
    fs.readFile(path.join(__dirname, "index.html"),"utf8",(err,data)=>{
        if(err)console.log("Error fetching index.html",err);
        else
        // res.setHeader({'content-type':'text/html'});
        res.send(data);
    })
})
// fs.readFile("index.html","")


app.post("/saveData",(req,res)=>{
    const body=req.body;
    const bmi=(body.weight/(body.height*body.height)).toFixed(3);
    userData.push({
        userName:body.userName,
        age:body.age,
        gender:body.gender,
        weight:body.weight,
        height:body.height,
        id:userData.length+1,
        bmi:bmi
    });
    fs.writeFile("userData.json",JSON.stringify(userData,2),(err)=>{
        if(err){
            console.log("Error saving the data in json")
        }
    })
    res.redirect("/");
    res.json({msg:'Saved data successfully'});
});

app.get("/getUserData",(req,res)=>{
    const allUserData=userData;
    res.json(allUserData);
})



app.listen(3500,(err)=>{
    if(err)console.log("Error starting server");
    else console.log("Server listening at port 3500");
})