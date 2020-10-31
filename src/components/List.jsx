import React from 'react';
import Location from './Location.jsx';




function List({ locations }) {


    const specificLocation = locations.map((location, i) =>
      <Location location={location} key={i + location.id}/>
    )
  return (
    <div>
      <div>
        {specificLocation}
      </div>

  </div>
  )
};


export default List;