import React, { useEffect } from 'react';
import {
  Form, FormCheck, FormFile, Button,
} from 'react-bootstrap';
import axios from 'axios';

function FormInputs({ onHide }) {
  const [state, setState] = React.useState({
    name: ''
  });

  function submitForm(event) {
    event.preventDefault();
    onHide();
    axios({
      method: 'post',
      url: 'http://52.26.193.201:3000/reviews/2',
      data: {
        name: state.name
        },
    }).catch((error) => {
      console.log(error);
    });
  }

  function handleChange(event) {
    const { value } = event.target;
    setState({
      ...state,
      [event.target.name]: value,
    });
    console.log(state);
  }




  return (
    <div><Form onSubmit={submitForm}>

    <Form.Group controlId="name">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" name="name" value={state.name} onChange={handleChange} />
    </Form.Group>


    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form></div>
  )
}

export default FormInputs;