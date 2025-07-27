
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

// app.use(express.static("public")) // Serve css file from other folder to the ejs
app.use(express.static(path.join(__dirname,"public/js")));
app.use(express.static(path.join(__dirname,"public/CSS"))); // Serve CSS and javascript file from parent directory:
app.set("view engine", "ejs"); // set express to find ejs file in views
app.set("views", path.join(__dirname, "/views")); // connect ejs file from the parent directory

app.get("/", (req, res) => {
    console.log("This is root path");
    res.render("home.ejs");
});

app.get("/rolldice",(req, res) =>{
    let diceVal = Math.floor(Math.random() * 6) + 1;
    res.render("rollDice.ejs", {diceVal});
});


app.get("/ig/:username", (req, res) => {
    let { username } = req.params;
    const followers =["Adam", "Bob", "Cately", "Steve", "John"];
    const following = ["Aslam", "Alam", "Salim", "Navin", "Lala", "Jhon"];
    res.render("instagram.ejs",{username, followers, following});

});

app.get("/ia/:username",(req, res) => {
    let { username } = req.params;
    const instaData = require("./data.json");
    let data = instaData[username];
    if(data){
        res.render("insta.ejs",{data});
    }
    else{
       res.render("error.ejs");
    }
    
});


app.listen(port,() => {
    console.log(`Server is listening at port ${port}`);
});