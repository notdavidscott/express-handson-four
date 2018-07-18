var express = require('express');
var router = express.Router();
const sqlite = require('sqlite3');


const db = new sqlite.Database('./chinook.sqlite', err => {
  if (err) {
    return console.log(err.message);
  }
 console.log("<< | You are connected to the database | >>");
});

const query = `SELECT Title from albums`;

db.all(query, (err, row) => {
  if (err) throw err;
  //console.log(row);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const albumList = `SELECT Title from albums`;

router.get('/albums', function(req, res, next) {
  db.all(albumList, function(err, row) {
    res.render('albums', {
      albums: row
    });
  });
});


router.get('/albums/:id', function (req, res, next) {
  let album = parseInt(req.params.id);
  //console.log(album);

  let albumIdQuery = `SELECT Title, ArtistId FROM albums WHERE AlbumId=${album}`;
  //console.log(albumIdQuery);

  db.all(albumIdQuery, (err, row) => {
    console.log(row);
    if (row.length > 0) {
      res.render('specificAlbum', {
        album: row[0]
      });
    } else {
      res.send('Not a valid album id');
    }
  });
 
});



module.exports = router;
