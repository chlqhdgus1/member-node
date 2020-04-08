var http = require("http");
var express = require("express");

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'bit';

var app = express();
app.use(express.static("public"));
app.use(express.bodyParser());
app.use(app.router);

app.get("/blogList", function(request, response){
  const client = new MongoClient(url);
  client.connect(function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const col = db.collection('articles');
        col.find({}).toArray(function(err, docs) {
        client.close();
        response.send(docs);
      });
  });
});


app.get("/blogInsert", function(request, respone){
  var title = request.param("title");
  var content = request.param("content");
  var saved_at = new Date();
  var doc = {title:title, content:content, saved_at:saved_at};

    const client = new MongoClient(url);
    client.connect(function(err, client) {
    const db = client.db(dbName);
    db.collection('articles').insertOne(doc, function(err, r) {
      _id = r.insertedId;
      client.close();
      respone.send(_id);
    });
  });
});


http.createServer(app).listen(52273, function(){
  console.log("서버가 가동되었습니다");
});
