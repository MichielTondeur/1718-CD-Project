const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
var mongoose = require('mongoose');
var serveStatic = require('serve-static');
var Artist = require("../models/artists");

//db connection
mongoose.connect('mongodb://michiel:Azerty123@ds259410.mlab.com:59410/artists');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

const app = express()

app.use(serveStatic(__dirname + "/dist"));


app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


//Add new post
app.post('/artists', (req, res) => {
  var db = req.db;
  var id = req.body.id;
  var name = req.body.name;
  var description = req.body.description;
  var genres = req.body.genres;
  var profilePicture = req.body.profilePicture;
  var isFavorite = req.body.isFavorite;
  var score = req.body.score;
  var albums = req.body.albums;

  var new_artist = new Artist({
    id: id,
    name: name,
    description: description,
    genres: genres,
    profilePicture: profilePicture,
    isFavorite: isFavorite,
    score: score,
    albums: albums
  })

  new_artist.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})

// Fetch all posts
app.get('/artists', (req, res) => {
    Artist.find({}, 'id name description genres profilePicture isFavorite score albums', function (error, artists) {
        if (error) { console.error(error); }
    res.send({
        artists: artists
    })
  })
})

// Update Favorite
app.put('/:id', (req, res) => {
    var db = req.db;
    Artist.findOne({"id": req.params.id}, 'isFavorite', function (error, artist) {
        if (error) { console.error(error); }

      artist.isFavorite = req.body.isFavorite
      artist.save(function (error) {
        if (error) {
          console.log(error)
        }
        res.send({
          success: true
        })
      })
    })
  })

// Fetch a single artist
app.get('/artist/:id', (req, res) => {
    var db = req.db;
    Artist.findOne({"id": req.params.id}, 'id name description genres profilePicture isFavorite score albums', function (error, artist) {
        if (error) { console.error(error); }
        res.send(artist)
    })
})

// Update a single artist
app.put('/artist/:id', (req, res) => {
var db = req.db;
Artist.findOne({"id": req.params.id}, 'description score', function (error, artist) {
    if (error) { console.error(error); }

    artist.description = req.body.description
    artist.score = req.body.score 
    artist.save(function (error) {
    if (error) {
        console.log(error)
    }
    res.send({
        success: true
    })
    })
})
})

app.listen(process.env.PORT || 8081)