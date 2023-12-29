import React, { useState } from 'react';
import './planWidget.css'
import {Button} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MyModal from '../widgets/myModal/myModal';
import ContactForPlan from './ContactForPlan';
const ContactUs = ()=>{
    const [showModal, setShowModal] = useState(false)
    
    const onContactUs = ()=>{
        setShowModal(true)
    }
    const onContactUsSuccess = ()=>{
        setShowModal(false)
    }
    return (
        <div className="plan-widget" >
            <MyModal  mWidth="640px" showModal={showModal} setShowModal={setShowModal} modalC={<ContactForPlan onContactUs={onContactUsSuccess} />}/>
            <div style={{textAlign: 'center', color: '#444', fontWeight: 700}}>Enterpise Platform</div>
            <div style={{marginTop: 8, lineHeight: 0.98, color: '#777', fontSize:15, textAlign: 'center'}}>
                Contact Us for the specifics
            </div>
            <div style={{marginTop:'63px'}}>
                <p style={{color:'#fff'}}>.</p>
            </div>
            <div style={{marginLeft: 'auto', marginRight: 'auto', display: 'table', marginTop: '-10px'}}>
                <Button onClick={onContactUs} variant="outlined" endIcon={<ArrowForwardIcon/>}>Contact Us</Button>
            </div>
        </div>
    )
} 
export default ContactUs