var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");


var handle = {}
handle["/"] = requestHandlers.start;
handle["/tstream"] = requestHandlers.tstream;
handle["/tsearch"] = requestHandlers.tsearch;
handle["/test"] = requestHandlers.test;


server.start(router.route, handle);
/*
function streamer(stream) {
	twit.stream('statuses/filter', {'locations':'-122.75,36.8,-121.75,37.8'},
				stream.on('data', function(data) {
					console.log(data);
					socket.broadcast.emit('incoming',(data));
			});
);
}
			
streamer();
*/