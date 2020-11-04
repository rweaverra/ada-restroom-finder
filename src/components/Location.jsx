import React, { useState } from 'react';



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

  const roundedDistance = Math.round(location.distance * 10) / 10


  return (
    <div>
      <h3>{location.name}</h3>
      <div>Distance: {roundedDistance} miles</div>
      <div>{location.street} {location.city}, {location.state}</div>
      <button className="buttons" onClick={() => copyToClipBoard(`${location.street} ${location.city}, ${location.state}`)}>copy street address</button>
      <div>{copySuccess}</div>
    </div>
  )
};



export default Location;