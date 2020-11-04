import React, { useEffect } from 'react';
import {
  Form, FormCheck, FormFile, Button,
} from 'react-bootstrap';
import axios from 'axios';

function FormInputs({ onHide }) {
  const [state, setState] = React.useState({
    name: '',
    street: '',
    city: '',
    state: '',
    accessible: '',
    comment: '',
  });






  function submitForm(event) {
    event.preventDefault();
    onHide();
    axios({
      method: 'post',
      url: 'http://localhost:4000/addLocation',
      data: {
        name: state.name,
        street: state.street,
        city: state.city,
        state: state.state,
        accessible: state.accessible,
        comment: state.comment,
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

  function handleRadio(event) {
    const isAccessible = event.currentTarget.value === 'yes';
    setState({
      ...state,
      accessible: isAccessible,
    });
    console.log(state);
  }



  return (
    <div><Form onSubmit={submitForm}>

    <Form.Group controlId="name">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" name="name" value={state.name} onChange={handleChange} />
    </Form.Group>

    <Form.Group controlId="street">
      <Form.Label>street address</Form.Label>
      <Form.Control type="text" name="street" value={state.street} onChange={handleChange} />
    </Form.Group>

    <Form.Group controlId="name">
      <Form.Label>city</Form.Label>
      <Form.Control type="text" name="city" value={state.city} onChange={handleChange} />
    </Form.Group>

    <Form.Group controlId="state">
      <Form.Label>state</Form.Label>
      <Form.Control type="text" name="state" value={state.state} onChange={handleChange} />
    </Form.Group>

    <Form.Group controlId="accessible">
          <Form.Label>Accessible</Form.Label>
          <Form.Check
            type="radio"
            label="yes"
            id="accessable"
            value="yes"
            checked={state.recommend === true}
            onChange={handleRadio}
          />
          <Form.Check
            type="radio"
            label="no"
            id="notAccessable"
            value="no"
            checked={state.recommend === false}
            onChange={handleRadio}
          />
        </Form.Group>

        <Form.Group controlId="comment">
          <Form.Label>Comment</Form.Label>
          <Form.Control as="textarea" rows="3" name="comment" value={state.comment} onChange={handleChange} />
        </Form.Group>


    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form></div>
  )
}

export default FormInputs;