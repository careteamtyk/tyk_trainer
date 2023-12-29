import React from 'react'
import { HeroSlider } from './HeroSlider'
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function Home() {
  return (
    <div>
        <HeroSlider />
        <div className='section'>
          <Container>
            <Row>
              <Col md={6}>
              <h1 className='heading-banner'>The Best Quiz Maker For <br></br> Business & Education </h1>
              <p className='small-p'>Tyk Here Is An Easy-To-Use, Customizable Online Testing Solution For Business, Training & Educational Assessments With Tests & Quizzes Graded Instantly, Saving Hours Of Paperwork!</p>
              <Button className='button' href="/login">Get Started</Button>
              </Col>
              <Col md={6}>
              <img className="img-banner" src="assets/images/2.png" alt="Second slide" />
              </Col>
            </Row>
          </Container>
        </div>
         <div className='section second'>
          <Container>
            <Row>
              <Col xs={6} md={5}>
              <img className="img-banner" src="assets/images/3.png" alt="Second slide" />
              </Col>
              <Col xs={12} md={7}>
              <h1 className='heading-banner'>Why Tykhere?</h1>
              <Row>
                <Col xs={12} md={6}>
                <div className='box-grid'>
                  <img src="assets/images/8.png" alt="trainer-img" />
                  <div className='content'>
                    <h4>Create your own assessment</h4>
                    <p>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry</p>
                  </div>
                </div>
                </Col>
                <Col xs={12} md={6}>
                <div className='box-grid'>
                  <img src="assets/images/5.png" alt="trainer-img" />
                  <div className='content'>
                    <h4>Detailed Score Analysis</h4>
                    <p>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry</p>
                  </div>
                </div>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                <div className='box-grid'>
                  <img src="assets/images/6.png" alt="trainer-img" />
                  <div className='content'>
                    <h4>Live Tests Experience</h4>
                    <p>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry</p>
                  </div>
                </div>
                </Col>
                <Col xs={12} md={6}>
                <Button className='button inner-block' href='#'>Get Started</Button>
                </Col>
              </Row>
              </Col>
            </Row>
          </Container>
        </div> {/* End */} {/* start */} <div className='section background-sec'>
          <Container>
            <Row>
              <Col md={4}>
              <img className="img-banner" src="assets/images/4.png" alt="Second slide" />
              </Col>
              <Col md={8}>
              <h1 className='heading-banner'>Choose Your Plan</h1>
              <p>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry <br></br>Lorem Ipsum Is Simply Dummy Text Of The Printing </p>
              <br></br>
              <Row>
                <Col xs={12} md={3}>
                <div className='box-design Interview'>
                  <h5>Basic</h5>
                  <h3>Rs. 699/- </h3>
                  {/* <h6>Billed yearly</h6> */}
                  <Button className='button' href="/login">Subscribe Now</Button>
                  <p style={{color: '#888', fontSize: '15px'}}>30 Assessments per month/up to 200 head counts per assessment</p>
                </div>
                </Col>
                <Col xs={12} md={3}>
                <div className='box-design Individual'>
                  <h5>Standard</h5>
                  <h3>Rs. 1299/- </h3>
                  {/* <h6>Billed yearly</h6> */}
                  <Button className='button' href="/login">Subscribe Now</Button>
                  <p style={{color: '#888', fontSize: '15px'}}>60 Assessments per month/200 head counts per assessment</p>
                </div>
                </Col>
                <Col xs={12} md={3}>
                <div className='box-design Team'>
                  <h5>Premium</h5>
                  <h3>Rs. 2499/-</h3>
                  {/* <h6>Billed yearly</h6> */}
                  <Button className='button' href="/login">Subscribe Now</Button>
                  <p style={{color: '#888', fontSize: '15px'}}>120 assessments per month/200 head counts per assessment</p>
                </div>
                </Col>
                {/* <Col xs={12} md={3}>
                <div className='box-design Enterprise'>
                  <h5>Enterprise Platform</h5>
                  <h6>Contact us for the specifics</h6>
                  <Button className='button' href="/login">Subscribe Now</Button>
                </div>
                </Col> */}
              </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
  )
}
