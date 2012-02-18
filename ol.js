	  var map = new OpenLayers.Map('map');

	  var wms = new OpenLayers.Layer.OSM();
	  map.addLayer(wms);


      map.setCenter(new OpenLayers.LonLat(-122.4386,37.7721) // Center of the map
           .transform(
            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
            new OpenLayers.Projection("EPSG:900913") // to Spherical Mercator Projection
          )
		, 13// Zoom level
        );