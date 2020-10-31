import React from 'react';



function Button() {

const getLocation = () => {

    navigator.geolocation.getCurrentPosition((position)=>{
    console.log('latitude', position.coords.latitude);
    console.log('longitude', position.coords.longitude);
})

}

return (
  <div>
    <button onClick={getLocation}>get Location</button>
  </div>
)

};

export default Button;