import React, { useState } from 'react';
import {
  Modal, ModalDialog, ModalHeader, ModalTitle, ModalBody, ModalFooter, Button,
} from 'react-bootstrap';
import FormInputs from './FormInputs';

function FormModal( {show, onHide }) {
  if (show) {
  return (
    <Modal show={show} onHide={onHide}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Submit ADA Public Restroom Location</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <FormInputs onHide={onHide}/>
          </Modal.Body>
          <Modal.Footer />
        </Modal.Dialog>
      </Modal>
  )
  }
  return <div/>
}

export default FormModal;