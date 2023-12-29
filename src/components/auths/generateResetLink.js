import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, Checkbox, CircularProgress, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import fbicon from '../../assets/images/fb.png'
import gicon from '../../assets/images/g.png'
import {toast } from 'react-toastify';
import './generateResetLink.css'
import applogo from '../../assets/svgs/applogo.svg'
import { API_ENDPOINT } from '../../constants/constants'
import PhoneInput from 'react-phone-number-input'
const GenerateResetLink = ()=>{
    const [phone, setPhone] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [linkSent, setLinkSent] = useState(false)

    const handleSignIn = (event)=>{
      event.preventDefault()
      setIsLoading(true)
      axios.post(API_ENDPOINT+'request-reset-link', {phone: phone}).then(res=>{
        setIsLoading(false)
        const d = res.data
        if(d.success){
           setLinkSent(true)
        }else{
          toast(d.message)
        }
      })
    }
    return(
        <div className='rd_auth_c'>
            <div className='rd_action_box'>
                <img className='action_app_logo' src={applogo} />
                <div style={{fontSize: '17px'}} className='action_tagline'>Receive a Secret Password Reset Link</div>
            <div className='rd_form_c'>
                <div style={{color: '#777', fontSize: '16px', marginBottom: '8px'}}>Enter your phone number to receive the reset Link</div>
               <form onSubmit={handleSignIn}>
               <PhoneInput defaultCountry='IN' disabled={linkSent} required type="phone" value={phone} onChange={setPhone}   placeholder='Enter Phone number'  />
               
               <div style={{display: 'table', marginLeft: 'auto', marginRight: 'auto', marginTop: '16px'}}>
                <Button type='submit' variant='contained' disabled={isLoading || linkSent}>Request Reset Link</Button></div>
               </form>
               {isLoading?<div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}><CircularProgress /></div>:''}
                <br />
                {
                    linkSent? <div style={{color: 'green'}}>
                    We have sent a link to <span style={{fontStyle: 'italic', color: '#444'}}>{`${phone}`}</span> to reset your password. Please Check your phone inbox and follow the link

                    <a style={{fontSize: '18px', marginLeft: '16px'}} href="/login">Go to Login</a>
                </div>:''
                }

            </div>
            </div>
        </div>
    )
}
export default GenerateResetLink