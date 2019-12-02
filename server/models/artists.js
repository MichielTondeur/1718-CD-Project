var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArtistSchema = new Schema({
  id: Number,
  name: String,
  description: String,
  genres: [],
  profilePicture: String,
  isFavorite: Boolean,
  score: Number,
  albums: [
      {
        name: String,
        albumPicture: String,
        released: Number,
        songs: []
      }
  ]

});

// var ArtistSchema = new Schema({
//     name: String,
//   });

var Artist = mongoose.model("Artist", ArtistSchema);
module.exports = Artist;