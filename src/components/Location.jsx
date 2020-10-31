import React from 'react';
import Directions from './Directions.jsx';


function Location({ location }) {
  console.log('inside location', location)
  return (
    <div>
      <h3>{location.name}</h3>
      <div>Distance: {location.distance} miles</div>
      <div>{location.street} {location.city}, {location.state}</div>
      <Directions />
    </div>
  )
};



export default Location;