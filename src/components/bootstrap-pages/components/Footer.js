import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';

import 'font-awesome/css/font-awesome.min.css';

export const Footer = () => {
  return (
      <div>
    <div className='footer'>
    <Container>
        <Row>
          <Col md={6}>
              <div className='d-flex-ogo'>
                <img src="assets/images/logo.png" alt='footer logo '  className='footer-logo'/>
            
            <div className='footer-links'>
            <Nav>
        <Nav.Item>
          <Nav.Link href="#"><i className="fa fa-envelope"></i>info@gmail.com</Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link href="#"><i className="fa fa-phone"></i> +123 456 78-90</Nav.Link>
        </Nav.Item>
      
     
      </Nav>
                
         </div>
           
            </div>

          </Col>
          <Col md={6}>
          <div className='d-flex social-icons'>
          <Nav>
        <Nav.Item>
          <Nav.Link href="#"><i className="fa fa-facebook"></i></Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link href="#"><i className="fa fa-twitter"></i></Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link href="#"><i className="fa fa-instagram"></i></Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link href="#"><i className="fa fa-linkedin"></i></Nav.Link>
        </Nav.Item>
      
     
      </Nav>
              </div>
              </Col>
        </Row>
    </Container>


    </div>
    <div className='footer-copyright'>
      <Container>
        <Row>
              <Col md ={6}>
                  <div className='footer-navlinks'>
                  <Nav>
        <Nav.Item>
          <Nav.Link href="/Home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link href="#">About Us</Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link href="/terms-conditions">Terms & Conditions</Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link href="/privacy-policy">Privacy Policy</Nav.Link>
        </Nav.Item>
        <Nav.Item>
        <Nav.Link href="#">Contact Us</Nav.Link>
        </Nav.Item>
      
     
      </Nav>
                  </div>
              </Col>
              <Col md ={6}>
              <div className='d-flex-logo copy'>
                  <p>Copyright 2012-2021, Tykhere. All Rights Reserved.</p>
                  </div> 
              </Col>
          </Row>
      </Container>

     </div>
  
     </div>
  )
}

export default Footer;