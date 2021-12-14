const express = require("express");
const mysql = require("mysql");
const ejs = require("ejs");

// create express app
const app = new express;

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


//start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {console.log(`Server started on PORT NO. ${PORT}`)});
