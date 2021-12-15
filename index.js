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
app.post("/updateperson", (req,res) => {})
    let sql = `UPDATE person SET ?`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(`Account entry was updated into the Database...`);
    });
;
// Deleting person information
app.post("/deleteperson", (req, res) => {})
    let sql = `DELETE FROM students WHERE lname = '${req.body.last_name}'`;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(`student entry was deleted in the db...`);
    });
  ;
  
  // Reading person information
  app.get("/readperson", (req, res) => {})
    let sql = `SELECT * FROM person`;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.render("readData", { data: result });
    });
  ;

  // Getting weight
  //Routine A
  // Bicep Curl
  app.get ("/readbicep"), (req,res) => {}
    let sql = `SELECT weight FROM person DIV 10`;
    db.query(sql, (err,result) => {
        if (err) {
            throw err;
        }
        res.render("readData", {data, result});
  });
  // Shoulder Press
  app.get ("/readshoulder"), (req,res) => {}
    let sql = `SELECT weight FROM person DIV 10`;
    db.query(sql, (err,result) => {
        if (err) {
            throw err;
        }
        res.render("readData", {data, result});
  });
  // readDelt

  app.get ("/readdelt"), (req,res) => {}
    let sql = `SELECT weight FROM person DIV 12`;
    db.query(sql, (err,result) => 
    {
        if (err) {
            throw err;
                }
        res.render("readData", {data, result});
    });

  // chestPress
  app.get ("/readcpress"), (req,res) => {}
    let sql = `SELECT weight FROM person DIV 10`;
    db.query(sql, (err,result) => {
        if (err) {
            throw err;
        }
        res.render("readData", {data, result});
  });
  // chestFly
  app.get ("/readcfly"), (req,res) => {}
    let sql = `SELECT weight FROM person DIV 10`;
    db.query(sql, (err,result) => {
        if (err) {
            throw err;
        }
        res.render("readData", {data, result});
  });
  // Triceps
  app.get ("/readtriceps"), (req,res) => {}
    let sql = `SELECT weight FROM person DIV 10`;
    db.query(sql, (err,result) => {
        if (err) {
            throw err;
        }
        res.render("readData", {data, result});
  });

  
  // Routine B


//start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {console.log(`Server started on PORT NO. ${PORT}`)});
