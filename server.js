var http = require('http');
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var port = process.env.PORT || 3000;

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;

var mongoURL ='mongodb://' + mongoUser + ':' + mongoPassword + '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/',function(req,res,next){
    var collection = db.collection('posts')
    console.log("==Server Displaying Index");
    collection.find({}).toArray(function (err, posts) {
        if (err) {
          res.status(500).send({
            error: "Error fetching posts from DB"
          });
        } else {
            console.log("==posts:", posts);
            var comments = posts.comments;
            console.log("==comments:",comments);
            res.status(200).render('news',{
                posts: posts,
                comments:comments
            });
        }
    });
   
});

app.get('*',function(req,res,next){
    console.log("==Server Displaying 404 Page");
    res.status(404);
});

MongoClient.connect(mongoURL,function(err,client){
    if (err) {
        throw err;
    }
    db = mongoDBDatabase = client.db(mongoDBName);
    app.listen(port, function () {
        console.log("== Server is listening on port", port);
    });
});
