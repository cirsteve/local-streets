var twitter = require('ntwitter');
var socket = require('socket.io');

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
					console.log(data);
					//socket.broadcast.emit('incoming',JSON.parse(data));
				});
			});
}

function test(response){
		
	var body = "<!DOCTYPE html>"+
"<head>"+
"<title>Streaming Tweets</title>"+
'<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>'+
'<script src="/socket.io/socket.io.js"></script>'+
'<script src="http://localhost/myhome/jslib/openlayer/lib/OpenLayers.js"></script>'+
"</head>"+
"<body>"+
"<h1>Stream All The Things</h1>"+
'<div style="width:700px; height:600px; float:left" id="map"></div>'+
'<div style="width:300px;float:right" class="tweets"></div>'+

'<script type="text/javascript">'+
	  'console.log("starting client");'+
	  'var map = new OpenLayers.Map("map");'+

	  'var wms = new OpenLayers.Layer.OSM();'+
	  'map.addLayer(wms);'+


      'map.setCenter(new OpenLayers.LonLat(-122.4386,37.7721)'+
           '.transform('+
            'new OpenLayers.Projection("EPSG:4326"),'+
            'new OpenLayers.Projection("EPSG:900913") '+
          ')'+
		', 13'+
        ');'+
	  'var markers = new OpenLayers.Layer.Markers("Markers");'+
	  'map.addLayer(markers);'+
	  'var boxes = new OpenLayers.Layer.Boxes("Boxes");'+
	  'var ext = [-122.75,36.8,-121.75,37.8];'+
	  'bounds = OpenLayers.Bounds.fromArray(ext);'+
	  'var box = new OpenLayers.Marker.Box(bounds);'+
	  'box.setBorder({color:"red",width:1});'+
	  'boxes.addMarker(box);'+
	  'map.addLayer(boxes);'+
	  'var size = new OpenLayers.Size(21,25);'+
	  'var icon = new OpenLayers.Icon("http://www.openlayers.org/dev/img/marker.png", size);'+
	  'var socket = io.connect("127.0.0.1:8888");'+
		'socket.on("incoming",function(data){'+
			'var d = $.parseJSON(data);'+
			'if (!d.geo){'+
				'var loc = "No Lat/Long";'+
			'}'+
			'else{'+
				'var loc = "Lat: "+d.geo.coordinates[0]+" Long: "+d.geo.coordinates[1];'+
				'var lonlati = new OpenLayers.LonLat(d.geo.coordinates[1],d.geo.coordinates[0])'+
					'.transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913"));'+
				'markers.addMarker(new OpenLayers.Marker(lonlati,icon.clone()));'+
			'}'+
			'$("div.tweets").prepend("<p>"+d.text + "</p>" + d.user.screen_name + " " + d.created_at + " " + loc +  "<hr />");'+
		'});'+
		
"</script>"+

"</body>";
	response.writeHead(200,{"Content-Type":"text/html"});
	response.write(body);
	response.end();
}

exports.start = start;
exports.tsearch = tsearch;
exports.tstream = tstream;
exports.test = test;