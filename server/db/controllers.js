const { RestroomLocation } = require('./schema');

const LocationController = {
  //get locations by either longitude and latitude within 1 point. need to understand relation of both. for now I will do a get all

  create: (body, callback) => {
    console.log('inside location controller')
    RestroomLocation.create(
      { name: 'turd burgle',
      street: 'String',
      city: 'String',
      state: 'String',
      accessible: true,
      comment: 'atte' },
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