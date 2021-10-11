const express = require('express');
const bodyparser = require("body-parser");
var items=["Buy food","Cook food","Eat food"];
var workitems=[];
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, function () {
    console.log("Server running on port 3000");
});

app.get("/", function (req, res) {
    var today = new Date();
    var options = {
        weekday: "long",
        day:"numeric",
        month:"long"
    };
    var day = today.toLocaleDateString("en-US",options);
    res.render("list", { listtitle: day, newitem:items });
});

app.post("/",function(req,res){
    if(req.body.button ==="Work"){
        workitems.push(req.body.newItem);
        res.redirect("/work");
    }else{
        items.push(req.body.newItem);
        res.redirect("/");
    }
});

app.get("/work",function(req,res){
    res.render("list",{listtitle:"Work List", newitem:workitems})
});

app.post("/work",function(req,res){
    workitems.push(req.body.newItem);
    res.redirect("/work");
});