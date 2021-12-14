const express = require("express");
const mysql = require("mysql");
const ejs = require("ejs");

// create express app
const app = new express;

//config connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Rocknroll1!",
    database: "mmaccount",
});

//connect w the db
db.connect((err) => {
    if(err) {
        throw err;
    } else {
        console.log(`Successfully connected to the Database...`);
    }
})

// parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ejs Middleware
app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));

//Route to homepage
app.get('/',(req,res) => {
    res.render('index');

});

// Creating an account (Sign-Up)
app.post("/insertperson", (req,res) => {
    let data = { fname: req.body.first_name, lname: req.body.last_name, email: req.body.email, mobile: req.body.mobile, pass: req.body.pass, address: req.body.address, weight: req.body.weight};
    let sql = `INSERT INTO person SET ?`;
    db.query(sql, data, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(`Account entry was inserted into the Database...`);
    });
});

// Update an account (Register/Update)
app.post("/updateperson", (req,res) => {
    let sql = `UPDATE person SET ?`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(`Account entry was updated into the Database...`);
    });
});
// Deleting person information
app.post("/deleteperson", (req, res) => {
    let sql = `DELETE FROM students WHERE lname = '${req.body.last_name}'`;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(`student entry was deleted in the db...`);
    });
  });
  
  // Reading person information
  app.get("/readperson", (req, res) => {
    let sql = `SELECT * FROM students`;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.render("readData", { data: result });
    });
  });


//start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {console.log(`Server started on PORT NO. ${PORT}`)});
