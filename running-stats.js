//var mongodb = require('mongodb');


//var mongo = new mongodb.Db('test', new mongodb.Server("127.0.0.1", 27017, {}));

function addHashTag(tag,mongo){
	console.log('addHashTag called with' + tag);
	mongo.open(function(err, db) {
		db.collection('hashtag', function(err, collection) {
			//collection.update({tag:tag},{tag:tag,$inc:{count:1}},true,false);
			//collection.save(({tag:tag},{$inc:{count:1}});
            var tagd = collection.find({tag:tag});
            console.log("tagd is: "+ tagd.tag);
            if ( tagd.count() > 0) {
                    collection.update({tag:tag},{$inc:{count:1}});
                    console.log("Upated the tag: " + tag);
                  }
            else {
                    collection.save({tag:tag,count:1});
                    console.log("Saved the tag: " + tag);
                  }
                  /*
			collection.find({tag:tag}, function(err, docs){
              console.log("called collection.find");
                docs.(function(err, count) {
                  console.log("There are " + count + " records.");
                  if ( count > 0) {
                    collection.update({tag:tag},{$inc:{count:1}});
                    console.log("Upated the tag: " + tag);
                  }
                  else {
                    collection.save({tag:tag,count:1});
                    console.log("Saved the tag: " + tag);
                  }
                  */
                //});
            //});
		});
    mongo.close();
	});
    
};
					
function getHashTag(tweet,mongo){
	console.log('getHashTag called');
	var tweet = tweet;
	var hashTags = tweet.entities.hashtags;
	for(var i=0;i<hashTags.length;i++){
			addHashTag(hashTags[i].text, mongo);
	};
};

exports.getHashTag = getHashTag;