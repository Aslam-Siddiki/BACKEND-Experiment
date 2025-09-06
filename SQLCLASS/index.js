const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const methodOverride = require("method-override"); 

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'Aslam@7861'
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ]; 
};

// # Commented out because data is saved and proceeds to backend integration with database.
// Display Table Data;
// let q = "SHOW TABLES";

// Inserting New Data;
let q = "INSERT INTO user(id, username, email, password) VALUES ?";


let data = [];
for(let i=1; i<=100; i++){
  let user = getRandomUser(); // 100 fake users.
  data.push(user);
}

// INSERTING THE DATA IN SQL QUERIES:
// connection.query(q, [data], (err, result) => {
//   if (err) {
//     console.log("Error inserting data:", err);
//   } else {
//     console.log("Data inserted successfully:", result.affectedRows);
//   }
// });

// THIS IS HOME ROUTE:
app.get("/",(req, res) =>{
  let q = `SELECT count(*) FROM user`;
  try {
    connection.query(q,(err, result) => {
      if(err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs",{count});
    });
  }
  catch(err){
    console.log(err);
    res.send("Some error in DATABASE");
  }
});

// SHOW ROUTE:
app.get("/user",(req, res) => {
  let q = ' SELECT * FROM user' ;

  try{
    connection.query(q, (err, users) => {
      if(err) throw err;
      res.render("showUser.ejs",{ users });
    });
  }
  catch(err){
    console.log(err);
    res.send("some error in database");
  }
});

// EDIT ROUTE:
app.get("/user/:id/edit",(req,res) =>{
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}' ` ;
  try{
    connection.query(q,(err,result) => {
      if(err) throw err;
      let user = result[0];
      
      res.render("edit.ejs",{user});
    });
  }
  catch(err){
    console.log(err);
    res.send("some error in database");
  }

});

// UPDATE (Databases)ROUTE;
app.patch("/user/:id",(req, res) =>{
  let { id } = req.params;
  let { password: formPass, username: newUsername } = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;
  try{
    connection.query(q,(err, result)=>{
      if(err) throw err;
      let user = result[0];
      if(formPass != user.password){
        res.send("WRONG password");
      }
      else{
        let q2 = `UPDATE user SET username = '${newUsername}' WHERE id = '${id}'`;
        connection.query(q2, (err, result) =>{
          if(err) throw err;
          res.redirect("/user");
        });
      }
      // res.send(user);
      // res.render["edit.ejs",{user}];
    });
  }
  catch(err){
    console.log(err);
    res.send("Some error in DB");
  }
});


app.listen(port,()=>{
  console.log(`Server is listening on port ${port}`);
});






