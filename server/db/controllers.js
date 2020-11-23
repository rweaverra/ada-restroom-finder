const { RestroomLocation } = require('./schema');

const LocationController = {


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
}


module.exports = {
  LocationController
};