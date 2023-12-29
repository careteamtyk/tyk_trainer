import React from 'react'

import { Row , Col , Container} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Trending from './Trending ';
import TrendingList from './TrendingList';
export default function MocktestScreenDetail() {
  return (
    <div>

  
        <section>
        <Container>
        <div className='what-test'>
        <br></br>
        <form action="/" method="get">
       
        <input
            type="text"
            id="header-search"
            placeholder="Search for any topic"
            name="s" 
        />
        <Button className='start-ass'>Search</Button>
     
    </form>
    <br></br>
        <h3 className='inner-tittle'> Mock Test > Science</h3>
        <br></br>
          <Row>
              <Col md={2}>
                  <div className='nav-arrows'>
                      <h5>Biology ></h5>
                  </div>
              </Col>
              <Col md={2}>
                  <div className='nav-arrows'>
                      <h5>Biology ></h5>
                  </div>
              </Col>
              <Col md={2}>
                  <div className='nav-arrows'>
                      <h5>Biology ></h5>
                  </div>
              </Col>
              <Col md={2}>
                  <div className='nav-arrows'>
                      <h5>Biology ></h5>
                  </div>
              </Col>
              <Col md={2}>
                  <div className='nav-arrows'>
                      <h5>Biology ></h5>
                  </div>
              </Col>
              <Col md={2}>
                  <div className='nav-arrows'>
                      <h5>Biology ></h5>
                  </div>
              </Col>
              <Col md={2}>
                  <div className='nav-arrows'>
                      <h5>Biology ></h5>
                  </div>
              </Col>
              <Col md={2}>
                  <div className='nav-arrows'>
                      <h5>Biology ></h5>
                  </div>
              </Col>
              <Col md={2}>
                  <div className='nav-arrows'>
                      <h5>Biology ></h5>
                  </div>
              </Col>
              <Col md={2}>
                  <div className='nav-arrows'>
                      <h5>Biology ></h5>
                  </div>
              </Col>
              <Col md={2}>
                  <div className='nav-arrows'>
                      <h5>Biology ></h5>
                  </div>
              </Col>
              <Col md={2}>
                  <div className='nav-arrows'>
                      <h5>Biology ></h5>
                  </div>
              </Col>
          </Row>
          <br></br>
       <h3 className='inner-tittle'>Popular assessment for Biology</h3>
     
          <TrendingList Trending={Trending} />
        </div>
        </Container>
        </section>


    

    </div>
  )
}
