var mongodb = require('mongodb');
var incremental = require('mongodb-incremental-mapreduce');

var findLocations = function() {
  emit(this.place.name, {count:1});
};

var listLocations = function(key, values) {
  var total = {count:0};
  
  values.forEach(function(value) {
    total.count += 1;
  });
  return total;
};
  
db.tweets.runCommand({
  "mapreduce":"tweets",
  "map":findLocations,
  "reduce":listLocations,
  "out":"locations"})

var findTags = function() {
  var tags = this.entities.hashtags;
  if (!tags[0] ) {
    return;
  }
  tags.forEach(function(tag) {
    emit(tag.text, {count:1});
  });
};

var countTags = function(key, values) {
    var total = {count:0};

    values.forEach(function(value) {
       total.count += 1;
    });
    return total;
};

var tagCountIMR = function() {
  var mongo = new mongodb.Db('tweets', new mongodb.Server("127.0.0.1", 27017, {}));
    mongo.open(function(err, db) {
      db.collection('sfnytweets', function(err, collection) {
        collection.mapReduce(findTags, countTags, { out: { incremental: 'tagCounts' } }, function(err, results) {
          console.log(results);
        });
