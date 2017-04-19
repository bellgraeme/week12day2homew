var MongoClient = require('mongodb').MongoClient;

var FilmQuery = function(){
    this.url = "mongodb://localhost:27017/ratings_site";
};

FilmQuery.prototype = {
  all: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if(db){
        //GET THE RIGHT COLLECTION
        var collection = db.collection('films');
        //FIND ALL FILMS
        //TURN THEM INTO AN ARRAY
        collection.find().toArray(function(err, docs){
          //INVOKE A CALLBACK
          onQueryFinished(docs);
        });
        
        
      }
    })
  },

  add: function(filmToAdd,onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if(db){
        var collection = db.collection('films');
        collection.insert(filmToAdd);
        collection.find().toArray(function(err, docs){
          console.log(docs);
          onQueryFinished(docs);
        })
      }
    })
  }
}

module.exports = FilmQuery;