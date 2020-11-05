const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const cors = require('cors');
const API_KEY = require('./../configKey')
const axios = require('axios')

const mongoDB = 'mongodb://localhost:27017/test';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('mongoose is connected')
});



const { RestroomLocation, restroomSchema } = require('./db/schema.js');
const { LocationController } = require('./db/controllers.js');


const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('../client/dist'));
app.use(cors());


//  Had to initialt the schema to mongoDB with the below functions. Not sure how they are doing it on their own.
mongoose.model('users', {name: String});
// mongoose.model('restroomlocations', restroomSchema);
// RestroomLocation();

app.post('/addLocation', (req, res) => {
  console.log(req.body);
  var result = req.body
   //will need to replace spaces with +
   var splitSpaces = result.street.split(' ');
   var formattedStreet = splitSpaces.join('+');
   var address = `${formattedStreet},+${result.city},+${result.state}`


   var apiRequest = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY.API_KEY}`

   console.log('apiRequest', apiRequest);

  //Make GoogleMaps API request to get long/lat
  axios.get(apiRequest)
   .then((response) => {
     var location = response.data.results[0].geometry.location

    var latitude = location.lat;
    var longitude = location.lng;

    result.latitude = latitude;
    result.longitude = longitude;
    console.log(result)

    //DATABASE QUERY BELOW
  LocationController.create(result, (err, result) => {
    if (err) {
      res.sendStatus(420)
    } else {
      res.send(result);
    }

  })

   })
   .catch(function (error) {
    console.log(error);
  });



  //DATABASE QUERY BELOW
  // LocationController.create('restroomlocations', (err, result) => {
  //   if (err) {
  //     res.sendStatus(420)
  //   } else {
  //     res.send(result);
  //   }

  // })

})



app.post('/locations', (req, res) => {
  console.log('req.body', req.body);
 var currentLatitude = req.body.latitude;
 var currentLongitude = req.body.longitude;

  RestroomLocation.find(function(err, result) {
    //iterate through results
    shortestDistance = [];
    shortest = result[0];

    result.forEach((location) => {
      //do a distance calculation with latitude and longitude
      var distance = Math.sqrt(Math.pow(Math.abs(currentLatitude - location.latitude), 2) + Math.pow(Math.abs(currentLongitude - location.longitude), 2))
       distance *= 69;
       location.distance = distance;

    })
    //sort the array of objects
    result.sort(function(a, b) {
      var distanceA = a.distance;
      var distanceB = b.distance;
      if (distanceA < distanceB) {
        return -1;
      }
      if (distanceA > distanceB) {
        return 1;
      }

    } )

    var closestSix = result.slice(0, 7)
    res.send(closestSix);

  })

})







app.listen(4000, () => {
	console.log("Server is listening on port 4000!")
});


