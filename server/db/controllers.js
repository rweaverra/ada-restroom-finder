const { RestroomLocation } = require('./schema');

const LocationController = {
  //get locations by either longitude and latitude within 1 point. need to understand relation of both. for now I will do a get all

  create: (body, callback) => {
    console.log('inside location controller', body);
    RestroomLocation.create(
      { name: body.name,
      street: body.street,
      city: body.city,
      state: body.state,
      accessible: true,
      comment: body.comment,
      latitude: body.latitude,
      longitude: body.longitude
    },
      (err, data) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, data);
        }
      }
    )
  }
  //need to find out how to do mongoose queries. What is the correct syntax?
}


module.exports = {
  LocationController
};