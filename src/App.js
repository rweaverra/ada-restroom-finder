import './App.css';
import React, {useState, useEffect} from 'react';
import List from './components/List.jsx';
import axios from 'axios';
import FormModal from './components/FormModal'
import {
  Container, Col, Row, Button,
} from 'react-bootstrap';

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

  useEffect(() => {
    getLocation();
  })



  // Modal===========
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  function handleShow() { setShow(true); }



  const axiosRequest = () => {
    if(!latitude) {

      alert('loading current location, please click again')
    } else {

      axios({
        method: 'get',
        url: `http://localhost:4000/locations`,
        body: {
          latitude: latitude,
          longitude: longitude
        }
      }).then((response) => {
        console.log(response.data);
        setLocations(response.data);
      })
      }

    }



  //get request to bathroom API to pull the top 5 nearest locations

 //create the get request with the current long/latitude

 //add get public restrooms button here



 //HAVING ISSUES SEARCHING LOCATION

  // if(!latitude) {
  //   return (
  //     <div>Currently finding your location</div>
  //   )
  // }

  return (

   <Container className="appContainer">
     <Row className="title">ADA Public Restroom Finder </Row>
     <Row className="buttonRow">

        <button className="buttons" onClick={axiosRequest}>get Location</button>

      <button className="buttons" onClick={handleShow}>submit form</button>

      </Row>
      <FormModal show={show} onHide={handleClose} />
      <div className="list">
      <List locations={locations}/>
      </div>

    </Container>

  )
}

export default App;
