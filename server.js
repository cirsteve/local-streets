var http = require("http");
var url = require("url");
var twitter = require("ntwitter");
var mongodb = require("mongodb");
var city_stream = require("./city-stream")


function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Req for " + pathname + " received.");

        route(handle,pathname,response);
        
	}
	var mongo = new mongodb.Db('tweets', new mongodb.Server("127.0.0.1", 27017, {}));
    var server = http.createServer(onRequest).listen(8888);
    var io = require("socket.io").listen(server);

    city_stream.cityStream(io);
    
    console.log("Server started.");
	

			

    
}

exports.start = start;
