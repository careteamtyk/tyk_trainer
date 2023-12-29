import React from 'react'
import { Row , Col , Container} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
export default function TrendingList(props) {
  return (
    <div>
    <Container >
    <Row>  
{props.Trending.map((value, index) => (
    <Col md={4}>
<div className="trending-box" key={index}>   
        <div className='trending-img'>
            <img src={value.img} alt="images"/>
            <div className='trending-contant'>
                <h6>{value.tittle}</h6>
                <p>{value.descrption}</p>
                <Button>Start Now</Button>
            </div>
        </div>
</div>
</Col>
))};

</Row>






</Container>


</div>
  )
}
