var twitter = require('ntwitter');
var socket = require('socket.io');
var fs = require('fs');
var mongodb = require('mongodb');

/*
var twit = new twitter({
  consumer_key: '8c7gfr2S6S2XL1eYnEe3g',
  consumer_secret: '2QCJkbYghdlea8NDE01Kee4OI1Exa3hNJbTLW9Oo',
  access_token_key: '15824038-ATKTE5TF09WatKvRoWlBbdCMqkn7cpGPjrIRsI0VY',
  access_token_secret: '2oepK6vv11RZiwnuSNgE55NKO7VLPd2YTcENL9eAc'
    });
    */

var twit = new twitter({
  consumer_key: 'GLGAif0alqaoqBzWZ9VUGw',
  consumer_secret: 'ZQRUuTibZdl3XQQxU2QUbryo3cO5QR3GwVJxo2aM',
  access_token_key: '15824038-2eWm6evfhsmdZhTvUz8BaJWAajhqtQLPblTciNmVo',
  access_token_secret: 'MUWIoCJBaXoobzLOMJYVhJ7EMBeKEYD6g78GinXiA'
    });

function start(response) {
    console.log("Request handler 'start' was called.");
	var body = 'html';
	var client = new mongodb.Db('test', new mongodb.Server("127.0.0.1", 27017, {})),
    test = function (err, collection) {
      collection.insert({a:2}, function(err, docs) {

        collection.count(function(err, count) {
          test.assertEquals(1, count);
        });

        // Locate all the entries using find
          collection.find().toArray(function(err, results) {
          test.assertEquals(1, results.length);
          test.assertTrue(results.a === 2);
		  console.log("mongo love");
          // Let's close the db
          client.close();
        });
      });
    };

client.open(function(err, p_client) {
  client.collection('test_insert', test);
});
	response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
	
}

function tsearch(response){
	console.log('starting tweet stream at ' + new Date().toTimeString());
    twit.search('lunch OR #hungry', function(err, data) {
	console.dir(data.results);
	var d = JSON.stringify(data);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(d);
    response.end();
	console.log('res done at '+ new Date().toTimeString());
    });

}

function tstream(response){
	console.log('starting tweet stream at ' + new Date().toTimeString());
	twit.stream('statuses/filter', {'locations':'-122.75,36.8,-121.75,37.8'},
			function(stream) {
				stream.on('data', function (data) {
					//console.log(data);
					//socket.broadcast.emit('incoming',JSON.parse(data));
				});
			});
}

function city_stream(response){
	var html;
	html = fs.readFileSync('./city_stream.html');
	response.writeHead(200,{"Content-Type":"text/html"});
	response.write(html);
	response.end();
}

function sf_stream(response){
	var html;
	html = fs.readFileSync('./sf_stream.html');
	response.writeHead(200,{"Content-Type":"text/html"});
	response.write(html);
	response.end();
}

function ny_stream(response){
    var html;
    html = fs.readFileSync('./ny_stream.html');
    response.writeHead(200,{"Content-Type":"text/html"});
    response.write(html);
    response.end();
}

function ny_static(response){
  var html = fs.readFileSync('./ny_static.html');
  response.writeHead(200,{"Content-Type":"text/html"});
  response.write(html);
  response.end();
};

function hash_vis(response){
  var html = fs.readFileSync('./hash_vis.html');
  response.writeHead(200,{"Content-Type":"text/html"});
  response.write(html);
  response.end();
};

function all_tweets(response) {

  response.writeHead(200,{"Content-Type":"application/json"});
  var mongo = new mongodb.Db('tweets', new mongodb.Server("127.0.0.1", 27017, {}));
  mongo.open(function(err, db) {
      if (err) throw err;
      db.collection('sfnytweets', function(err, collection) {
        collection.find().limit(10000).toArray(function(err, docs) {
          response.write(JSON.stringify(docs));
          response.end();
        });
      });
  });
};
  

exports.start = start;
exports.tsearch = tsearch;
exports.tstream = tstream;
exports.sf_stream = sf_stream;
exports.ny_stream = ny_stream;
exports.city_stream = city_stream;
exports.all_tweets = all_tweets;
exports.hash_vis = hash_vis;
