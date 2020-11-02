import './App.css';
import React, {useState} from 'react';
import List from './components/List.jsx';
import axios from 'axios';

function App() {
  const [locations, setLocations] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  //this needs to be asynchronous
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position)=>{
    console.log('latitude', position.coords.latitude);
    console.log('longitude', position.coords.longitude);

    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    setLatitude(latitude.toString());
    setLongitude(longitude.toString());
  })
  };

  getLocation();

  const axiosRequest = () => {
    if(!latitude) {

      console.log('waht!')
    } else {

      axios({
        method: 'get',
        url: `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&ada=true&lat=${latitude}&lng=${longitude}`
      }).then((response) => {
        console.log(response.data);
        setLocations(response.data);
      })
      }

    }



  //get request to bathroom API to pull the top 5 nearest locations

 //create the get request with the current long/latitude

 //add get public restrooms button here

  if(!latitude) {
    return (
      <div>loading</div>
    )
  }

  return (


    <div>
      <div className="App">


      <List locations={locations}/>
    </div>
    <div>
      <button onClick={axiosRequest}>get Location</button>
    </div>
    </div>

  )
}

export default App;
