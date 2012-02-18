var http = require("http");
var url = require("url");
var twitter = require("ntwitter");

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Req for " + pathname + " received.");

        route(handle,pathname,response);
        
	}

    var server = http.createServer(onRequest).listen(8888);
	var io = require("socket.io").listen(server);
	io.sockets.on('connection', function(socket){
		console.log("Socket connected");
		var twit = new twitter({
				consumer_key: 'GLGAif0alqaoqBzWZ9VUGw',
				consumer_secret: 'ZQRUuTibZdl3XQQxU2QUbryo3cO5QR3GwVJxo2aM',
				access_token_key: '15824038-2eWm6evfhsmdZhTvUz8BaJWAajhqtQLPblTciNmVo',
				access_token_secret: 'MUWIoCJBaXoobzLOMJYVhJ7EMBeKEYD6g78GinXiA'
				});
		console.log('begin the stream');
		twit.stream('statuses/filter', {'locations':'-122.75,36.8,-121.75,37.8'},
		//twit.stream('statuses/filter', {'locations':'-83.1843,42.4827,-83.0566,42.7016'},
			function(stream) {
				stream.on('data', function (data) {
					console.log(data);
					socket.emit('incoming',JSON.stringify(data));
				});
			});
	});

    console.log("Server started.");
	

			

    
}

exports.start = start;