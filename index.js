var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");


var handle = {}
handle["/"] = requestHandlers.start;
handle["/tstream"] = requestHandlers.tstream;
handle["/tsearch"] = requestHandlers.tsearch;
handle["/sf_stream"] = requestHandlers.sf_stream;
handle["/ny_stream"] = requestHandlers.ny_stream;
handle["/city_stream"] = requestHandlers.city_stream;

server.start(router.route, handle);
