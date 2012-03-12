var twitter = require("ntwitter");
var mongodb = require("mongodb");

var cityStream = function(io) {
   var mongo = new mongodb.Db('tweets', new mongodb.Server("127.0.0.1", 27017, {}));
   //var io = require("socket.io").listen(server);
   io.sockets.on('connection', function(socket){
        console.log("Socket connected sf-stream");
        var twit = new twitter({
                consumer_key: 'GLGAif0alqaoqBzWZ9VUGw',
                consumer_secret: 'ZQRUuTibZdl3XQQxU2QUbryo3cO5QR3GwVJxo2aM',
                access_token_key: '15824038-2eWm6evfhsmdZhTvUz8BaJWAajhqtQLPblTciNmVo',
                access_token_secret: 'MUWIoCJBaXoobzLOMJYVhJ7EMBeKEYD6g78GinXiA'
                });
        console.log('begin the sf-stream');
        mongo.open(function(err, db) {
        twit.stream('statuses/filter', {'locations':'-122.75,36.8,-121.75,37.8,-74,40,-73,41'},
            function(stream) {
                stream.on('data', function (data) {
                        console.dir(data);
                        console.log(data);
                        db.collection('sfnytweets', function(err, collection) {
                            collection.insert(data, function(docs) {
                                 //Count the number of records
                                collection.count(function(err, count) {
                                    console.log("There are " + count + " sf records.");
                                });
                            });
                        });
                    socket.emit('sfny-incoming',JSON.stringify(data));
                    });
                });
                
            });
    });
};


exports.cityStream = cityStream;

