var createFeaturePopup = function(layer, lonlat, data) {
  var feature = new OpenLayers.Feature(layer, lonlat, data);
  
  layer.events.register("mousedown", feature, function(evt) {
    if (this.popup == null) {
      this.popup = this.createPopup();
      map.addPopup(this.popup);
      this.popup.show();
    } else {
      this.popup.toggle();
    }
    OpenLayers.Event.stop(evt);
  });
  return feature;
};
  