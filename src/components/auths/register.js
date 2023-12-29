import { Checkbox, CircularProgress, FilledInput, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material'
import fbicon from '../../assets/images/fb.png'
import gicon from '../../assets/images/g.png'
import applogo from '../../assets/svgs/applogo.svg'
import {toast } from 'react-toastify';

import {useEffect, useState} from 'react'
import axios from 'axios'
import './auth.css'
import OtpInput from 'react-otp-input'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { API_ENDPOINT } from '../../constants/constants';
import CustomCircularP from '../widgets/customCircularP';
import PhoneInput from 'react-phone-number-input';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const Register = ()=>{

    const emailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    const [name, setName] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [requesting, setRequesting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showOTP, setShowOTP] = useState(false)
    const [phoneVerified, setPhoneVerified] = useState(false)
    const [otp, setOTP] = useState("")
    const [otpToken, setOtpToken] = useState("")
    const handleSubmit = (event)=>{
        event.preventDefault()
        if(!emailPattern.test(email)){
            toast("Invalid Email ID")
        }else if(!phoneVerified){
            toast("Please verify phone first")
        }else{
            setRequesting(true)
            axios.post(API_ENDPOINT+'trainer/register', {name, email, password, phone}).then(res=>{
                setRequesting(false)
                let d = res.data
                if(d.success){
                    document.location.href = "/login"
                }else{
                    toast(d.message)
                }
            })
        }

    }
    useEffect(()=>{
        if(otp.length === 6){
            //autoverify otp
            setRequesting(true)
            axios.post(API_ENDPOINT+'trainer/verify-otp', {otp: otp, token: otpToken}).then(res=>{
                let d = res.data
                setRequesting(false)
                if(d.success){
                    setPhoneVerified(true)
                    toast(d.message)
                }else{
                    toast(d.message)
                }
            })
        }
    }, [otp])
    const handleOTP = (ot)=>{
        setOTP(ot)
    }
    const requestOTP = ()=>{
        if(phone.length <=6 ){
            toast("Please input valid phone number")
        }else{
            if(!showOTP){
                setIsLoading(true)
               axios.post(API_ENDPOINT+'trainer/request-otp', {phone: phone}).then(res=>{
                    setIsLoading(false)
                    let d = res.data
                    if(d.success){
                        setShowOTP(true)
                        let token = d.message.token
                        setOtpToken(token)
                    }
               })

            }else{
                if(otp.length !== 6){
                    toast("Please input otp")
                }else{
                    
                }
            }
        }
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleLogin = ()=>{
        document.location.href = "/login"
    }
    return(
        <div className='rd_auth_c'>
            <CustomCircularP show={requesting}/>
            <div className='rd_action_box'>
                <img className='action_app_logo' src={applogo} />
                <div className='action_tagline'>Sign Up to continue</div>
        <form onSubmit={handleSubmit}>
        <div className='rd_form_c'>
           <TextField value={name} onChange={(event)=>setName(event.target.value)} required variant="standard" fullWidth size='small' label='Full name'  />
           <div style={{display: 'flex', position: 'relative', margin: '18px 0 4px 0'}}>
            <div style={{flex: 1}}>
            <PhoneInput defaultCountry='IN' disabled={showOTP}  value={phone} onChange={setPhone}  placeholder ='Phone'  />
            {phoneVerified?<div style={{position: 'absolute', right: 0, top: '8px', cursor: 'pointer'}}>
                <CheckCircleIcon sx={{color: 'green'}} />
            </div>:''}
            </div>
           <button style={{display: showOTP?'none':'block'}} className='btn-handle-verify' type='button' disabled={phoneVerified}  onClick={requestOTP}>{phoneVerified? 'Verified':(showOTP?'Verify OTP':'Request OTP')}</button>
           </div>
           {showOTP && !phoneVerified?<div className='r_otp_l'>
           <OtpInput isDisabled={phoneVerified} value={otp} onChange={handleOTP}  numInputs={6} separator={<span> &nbsp;&nbsp;</span>}/>
           </div>:''}
           <FormControl size='small' fullWidth sx={{ m: 1}} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(event)=>setPassword(event.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=>setShowPassword(!showPassword)}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ?  <Visibility />:<VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
           <TextField value={email} onChange={(event)=>setEmail(event.target.value)} required variant="standard" fullWidth size='small' label='Email(secondary Account)'  />
           <button disabled = {isLoading} className='btn-create-account'>{isLoading?'Creating...':'Create Account'}</button>
            <div>
                <br />
            <center>
                <table><tr><td>Have an Account?</td><td><span onClick={handleLogin} style={{fontWeight: 'bold', color: '#6f51ff', cursor:'pointer'}}>SignIn</span></td></tr></table>
                </center>
            <p>
            By signing up, you agree to our <a href="/terms-conditions">Terms of Service</a> and <a href="/privacy-policy">Privacy Policy</a>
                </p></div>
        </div>
        </form>
        </div>
       
    </div>
    )
}
export default Register