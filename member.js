module.exports.insertMember = function(doc) {
  //모듈로 내보내겠다, 함수명
  const MongoClient = require('mongodb').MongoClient;
  const assert = require('assert');

  // Connection URL
  const url = 'mongodb://localhost:27017';

  // Database Name
  const dbName = 'bit';

  // Create a new MongoClient
  const client = new MongoClient(url);

  // Use connect method to connect to the Server
  client.connect(function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    const db = client.db(dbName);

    // Insert a single document
    db.collection('member').insertOne(doc, function(err, r) {

      client.close();

    });
  });
}

module.exports.listMember = function(request, response) {
  const MongoClient = require('mongodb').MongoClient;
  const assert = require('assert');

  // Connection URL
  const url = 'mongodb://localhost:27017';

  // Database Name
  const dbName = 'bit';

  // Create a new MongoClient
  const client = new MongoClient(url);

  // Use connect method to connect to the Server
  client.connect(function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    const db = client.db(dbName);

    const col = db.collection('member');


    // Get first two documents that match the query
    col.find({}).toArray(function(err, docs) {
      // assert.equal(null, err);
      // assert.equal(2, docs.length);
      client.close();
      response.send(docs);
    });
  });
}



module.exports.update = function(doc,_id) {
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require("mongodb").ObjectID;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
// Database name
const dbName = 'bit';

const client = new MongoClient(url);

(async function() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Get the updates collection
    const col = db.collection('member');

    // Update a single document
    r = await col.updateOne({_id:new ObjectID(_id)},{$set: doc});



  } catch(err) {
    console.log(err.stack);
  }
  // Close connection
  client.close();
})();
}




module.exports.delete = function(doc,_id) {
const ObjectID =require("mongodb").ObjectID;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
// Database name
const dbName = 'bit';

const client = new MongoClient(url);

(async function() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Get the removes collection
    const col = db.collection('member');
    let r;

    // Remove a single document
    r = await col.deleteOne({_id: new ObjectID(_id)},{$set:doc});
    //assert.equal(1, r.deletedCount);



  } catch(err) {
    console.log(err.stack);
  }
  // Close connection
  client.close();
})();
}
