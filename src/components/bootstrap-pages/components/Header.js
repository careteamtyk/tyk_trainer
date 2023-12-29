import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import StartAssessment from '../../widgets/startButton';
import { Link } from 'react-router-dom';
import RdButton from '../../widgets/rdButton';


export const Header = () => {

  const handleSignIn = ()=>{
    document.location.href = "/login"
  }
  return (
   <div>
    <Navbar  expand="lg" sticky="top" >
    <Container>
      <Navbar.Brand ><Link to='/'> <img src="assets/images/logo.png" alt="logo" className='logo-header' /></Link></Navbar.Brand>
      
     
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
           
         </Nav>
      
        {/* <Form className="d-flex form-btn">
          <Form.Control
            type="search"
            placeholder="Enter assessment code"
            
            aria-label="Search"
          />
          <Button className='start-ass'>Start Assessment</Button>
        </Form> */}
        <div className='action_container'>
            <RdButton onClick = {handleSignIn} value="Sign In"/>
            <StartAssessment />
        </div>   
         {/* <Button  href="/login" className='btn-sign'>Sign In</Button> */}
     
    </Container>
  </Navbar>
  <div>
 
  </div>
</div>
  )
}


export default Header;
