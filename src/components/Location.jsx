import React, { useState } from 'react';
import Directions from './Directions.jsx';


function Location({ location }) {
  console.log('inside location', location)
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipBoard = async copyMe => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };


  return (
    <div>
      <h3>{location.name}</h3>
      <div>Distance: {location.distance} miles</div>
      <div>{location.street} {location.city}, {location.state}</div>
      <button onClick={() => copyToClipBoard(`${location.street} ${location.city}, ${location.state}`)}>copy street address</button>
      <div>{copySuccess}</div>
    </div>
  )
};



export default Location;