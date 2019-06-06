var http = require('http');
//var handler = require('./server_function');


var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/',function(req,res,next){
    console.log("==Server Displaying Index");
    next();
});
app.get('*',function(req,res,next){
    console.log("==Server Displaying 404 Page");
    next();
});

app.listen(port, function () {
    console.log("== Server is listening on port", port);
  });