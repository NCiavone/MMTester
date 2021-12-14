const express = require('express');

const app = new express;


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
