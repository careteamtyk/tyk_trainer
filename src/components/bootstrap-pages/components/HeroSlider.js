import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import image from "../assets/img/background.png";
import { Button, Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
export const HeroSlider = () => {
  return (
   <>
     <Carousel fade>
      <Carousel.Item>
        
      <div className='background'>
           
            <Row className='banner-body'>
                <Col md ={6}>
                   <h1 className='heading-banner'>The Best Quiz Maker For Business & Education</h1>
                   <p className='small-p'>Tyk Here Is An Easy-To-Use, Customizable Online Testing Solution For Business, Training & Educational Assessments With Tests & Quizzes Graded Instantly, Saving Hours Of Paperwork!</p>
                   <br></br><Button className='button'  href="/login">Get Started</Button>
                   </Col>
               <Col md={6} >
                <img
         className="img-banner"
         src="assets/images/1.png"
         alt="Second slide"
       />
                   </Col>
               
       
        </Row>
        </div>
      </Carousel.Item>
      <Carousel.Item>
      <div className='background' >
           
            <Row className='banner-body'>
                <Col md ={6}>
                   <h1 className='heading-banner'>The Best Quiz Maker For Business & Education</h1>
                   <p className='small-p'>Tyk Here Is An Easy-To-Use, Customizable Online Testing Solution For Business, Training & Educational Assessments With Tests & Quizzes Graded Instantly, Saving Hours Of Paperwork!</p>
                   <br></br><Button className='button'  href="/login">Get Started</Button>
                   </Col>
               <Col md={6} >
                <img
         className="img-banner"
         src="assets/images/1.png"
         alt="Second slide"
       />
                   </Col>
               
       
        </Row>
        </div>
     </Carousel.Item>
     <Carousel.Item>
        
        <div className='background'>
           
            <Row className='banner-body'>
                <Col md ={6}>
                   <h1 className='heading-banner'>The Best Quiz Maker For Business & Education</h1>
                   <p className='small-p'>Tyk Here Is An Easy-To-Use, Customizable Online Testing Solution For Business, Training & Educational Assessments With Tests & Quizzes Graded Instantly, Saving Hours Of Paperwork!</p>
                   <br></br><Button className='button'  href="/login">Get Started</Button>
                   </Col>
               <Col md={6} >
                <img
         className="img-banner"
         src="assets/images/1.png"
         alt="Second slide"
       />
                   </Col>
               
       
        </Row>
        </div>
     </Carousel.Item>
     
    </Carousel>
   </>
  )
}
