import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';


function Popupbox() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>

    <Container>
      <div className="text-center popup-btn">
      <Button variant="primary" onClick={handleShow}>
        popupbox
      </Button>
      </div>
    </Container>
     

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        
        </Modal.Header>
        <Modal.Body>
       
        <div className='popupbox text-center'>
           <img src='assets/images/logo.png' alt="img"/>
           <h6>Robotic Process Automation </h6>
           <p>2 Question | 30 Minutes</p>
           <div className='pop-form'>
               <h6>Enter Your Details</h6>
               <Form>
      <Form.Group className="mb-3" controlId="formBasicName">
     
        <Form.Control type="email" placeholder="Enter email" />
     
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
     
        <Form.Control type="email" placeholder="Enter email" />
       
      </Form.Group>
   
      </Form>
   
           </div>
           <Button className='pop-button'>Submit</Button>
        </div>
            
          
          
          </Modal.Body>
        
      </Modal>
    </>
  );
}

export default Popupbox;








