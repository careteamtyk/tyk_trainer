import { AbcOutlined } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { TextField } from "@mui/material"
import { useState } from "react"
import { Button } from "react-bootstrap"
import AppLogo from "../widgets/appLogo"
import SaveIcon from '@mui/icons-material/Save';
import Footer from "../footer/footer"
import { toast } from "react-toastify"
import axios from "axios"
import './contactus.css'
import { API_ENDPOINT } from "../../constants/constants"
import myImage1 from '../../assets/images/get_touch.png';
import Header from "../header/header"

const ContactUs = ()=>{
    const emailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const handleSubmit = (e)=>{
        e.preventDefault()

        if(email === ''){
            toast('Please Enter Email')
        }else if(!emailPattern.test(email)){
            toast("Please Enter valid email")
        }else if(message === ''){
            toast("Please Enter message")
        }else{
            setLoading(true)
            axios.post(API_ENDPOINT+'user/send-message', {name: name, email: email, phone: phone, message: message}).then(res=>{
                let d = res.data
                setLoading(false)
                if(d.success){
                    toast(d.message)
                    setName('')
                    setEmail('')
                    setPhone('')
                    setMessage('')
                }else{
                    toast(d.message)
                }
            })
        }


    }
    return(
        <div>
            <div className="about-us" >
            <Header />  
            <div className="t-contactus-c">
                <div className="t-contactus-form">
                    <h3><strong>Don't hasitate to contact with us for any kind of information</strong></h3>
                    <form onSubmit={handleSubmit} style={{marginTop: '24px'}}>
                        <TextField className="cu-form" value={name} onChange={e=>setName(e.target.value)} variant="outlined" type='text' fullWidth size="small" label="Your Name"/>
                        <TextField className="cu-form" value={email} onChange={e=>setEmail(e.target.value)} variant="outlined" type='email' fullWidth size="small" label="Your Email Id" required/>
                        <TextField  className="cu-form" value={phone} onChange={e=>setPhone(e.target.value)} sx={{marginTop: '16px'}} variant="outlined" type='phone' fullWidth size="small" label="Your Phone Number"/>
                        <TextField   className="cu-form" sx={{marginTop: '16px'}} variant="outlined" type='text' fullWidth size="small" label="Subject"/>
                        <textarea  value={message} onChange={e=>setMessage(e.target.value)} rows='4' placeholder="Your Message" required>
                        </textarea>
                        <LoadingButton style={{backgroundColor: '#8E79FA'}} type="submit" loadingPosition="start" startIcon={<SaveIcon />} loading={loading}  variant="contained" sx={{marginTop: '16px'}} fullWidth>SEND MESSAGE</LoadingButton>
                    </form>
                </div>
                <div className="t-contactus-ab">
                    <img style={{width: "250px"}} src={myImage1}/>
                    <h2><strong><br /></strong></h2>
                    <p><strong>Address:</strong> Peninsula Pinnacle,Exide Gate, Sarjapura, Bangalore-562125</p>
                    <p><strong>Contact Number:</strong> 9980517031</p>
                    <p><strong>email id:</strong> careteam.tyk@gmail.com</p>
                </div>
            </div>
        </div>
            <Footer />
        </div>
    )
}
export default ContactUs