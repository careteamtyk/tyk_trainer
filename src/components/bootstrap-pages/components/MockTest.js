import React, { useEffect, useState } from 'react';

import { Row , Col , Container} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Trending from './Trending ';
import TrendingList from './TrendingList';
import Science from '../assets/img/1-icon.png';
import Maths from '../assets/img/icon2.png';
import Technology from '../assets/img/icon3.png';
import Languages from '../assets/img/icon4.png';
import CreativeArts from '../assets/img/icon5.png';
import CareerEd from '../assets/img/icon6.png';
import Corporate from '../assets/img/icon7.png';
import SocialStudies from '../assets/img/icon8.png';
import Health from '../assets/img/icon9.png';
import Header from './Header';
import axios from 'axios';
import { API_ENDPOINT, HEADER_TOKEN } from '../../../constants/constants';
import { toast } from 'react-toastify';
import receit from './receit.png'
import { CircularProgress } from '@mui/material';
import STCatItem from './STCatItem';
import STCategories from './STCategories';
import STmts from './STmts';
import STSubcats from './STSubcats';
import Footer from '../../footer/footer';
export const MockTest = () => {
  const [showSubcat, setShowSubcat] = useState(false)
  const [showAsm, setShowAms] = useState( false)

  const [currentCat, setCurrentCat] = useState("")
  const [currentSubcat, setCurrentSubCat] = useState("")

  const onCatSelect = (cat)=>{
    setCurrentCat(cat)
    setShowSubcat(true)
  }
  const onSubCatSelect = (subcat)=>{
    setCurrentSubCat(subcat)
    setShowAms(true)
  }
  const onCategoryShow = ()=>{
    setShowAms(false)
    setShowSubcat(false)
  }
  const onSubCatShow = ()=>{
    setShowAms(false)
    setShowSubcat(true)
  }
  const onShowAsm = ()=>{
    setShowAms(true)
  } 
  return (
    <div>
    <Header />
        <section>
          <br />
        <Container>
        <div className='what-test'>
            <div className='text-center'>
        <h1 className='heading-banner'>What test will you take today?</h1>
          
        <br/>
        <form action="/" method="get">
       
        <input
            type="text"
            id="header-search"
            placeholder="Search for any topic"
            name="s" 
        />
        <Button >Search</Button>
     
    </form>
    </div>
    <Container>
        <Row>
          <div className="course-list">
          <ul className="breadcrumb">
            <li onClick={onCategoryShow}><a href="javascript:void(0);">Categories</a></li>
            {showSubcat? <li onClick={onSubCatShow}><a href="javascript:void(0);">{currentCat}</a></li>:''}
            {showAsm? <li onClick={onShowAsm}>{currentSubcat}</li>:''}
          </ul>
            {
              showAsm?
              <STmts cat={currentCat} subcat={currentSubcat}/>
              :showSubcat?
              <STSubcats cat={currentCat} onSelect={onSubCatSelect} />
              :
              <STCategories onSelect={onCatSelect}/>
            }
            
            </div>
        </Row>
      </Container>

      <div>
          <h3 className='inner-tittle'>Trending Assessments</h3>
          <div style={{fontWeight: '600', fontSize: '24px', color: 'rgb(158 154 154)', opacity: '0.6'}}>
            No Trending Assessments </div>
      </div>
       
       
        </div>
        </Container>
        </section>

<br />
            <Footer />

    </div>
  )
}

export default MockTest;