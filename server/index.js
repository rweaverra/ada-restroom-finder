const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')

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


//  Had to initialt the schema to mongoDB with the below functions. Not sure how they are doing it on their own.
mongoose.model('users', {name: String});
// mongoose.model('restroomlocations', restroomSchema);
// RestroomLocation();

app.post('/addLocation', (req, res) => {

  // mongoose.model('users').create(
  //   { name: 'asdf',
  //   street: 'String',
  //   city: 'String',
  //   state: 'String',
  //   accessible: true,
  //   comment: 'atte' },
  //   function(err, users) {
  //     console.log('recevec')
  //     res.send(users);
  //   }
  // )

  LocationController.create('restroomlocations', (err, result) => {
    if (err) {
      res.sendStatus(420)
    } else {
      res.send(result);
    }

  })

})



app.get('/test', (req, res) => {

  RestroomLocation.find(function(err, result) {
    res.send(result);
  })
  // mongoose.model('restroomlocations').find(function(err, users) {
  //   console.log('recevec')
  //   res.send(users);
  // })

})







app.listen(4000, () => {
	console.log("Server is listening on port 4000!")
});


