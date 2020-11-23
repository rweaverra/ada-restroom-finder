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
        method: 'post',
        url: `http://localhost:4000/locations`,
        data: {
          latitude: latitude,
          longitude: longitude
        }
      }).then((response) => {
        console.log(response.data);
        setLocations(response.data);
      })
      }

    }

  return (

   <Container className="appContainer">
     <Row className="title">
     <div>
      <img src="https://winmarkstampandsign.com/wp-content/uploads/2018/08/ADA005-Black.jpg" alt="image" />
    </div>
     ADA Public Restroom Finder </Row>
     <Row className="buttonRow">

        <button className="buttons" onClick={axiosRequest}>Find Nearest Restrooms</button>

      <button className="buttons" onClick={handleShow}>Submit New Restroom</button>

      </Row>
      <FormModal show={show} onHide={handleClose} />
      <div className="list">
      <List locations={locations}/>
      </div>

    </Container>

  )
}

export default App;
