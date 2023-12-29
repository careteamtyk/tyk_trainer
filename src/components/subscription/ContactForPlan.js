import React, { useState } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PhoneInput from 'react-phone-number-input';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_ENDPOINT } from '../../constants/constants';
const ContactForPlan = ({onContactUs}) => {
  const [formData, setFormData] = useState({
    message: '',
    phone: '',
    email: '',
    name: ''
  });
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };

  const isValidPhone = (phone) => {
    const phonePattern = /^[0-9]{10}$/;  // Simple validation for a 10 digit phone number
    return phonePattern.test(phone);
  };

  const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.message.trim()) {
            toast.error("Message cannot be empty");
            return;
        }
        if (!isValidPhone(formData.phone)) {
            toast.error("Invalid phone number");
            return;
        }
        if (!isValidEmail(formData.email)) {
            toast.error("Invalid email address");
            return;
        }
        setLoading(true)
        axios.post(API_ENDPOINT+'contact-us', formData).then(res=>{
            setLoading(false)
            const d = res.data
            if(d.success){
                toast.success(d.message)
                setFormData({
                    message: '',
                    phone: '',
                    email: '',
                    name: ''
                });
                onContactUs()
            }else{
                toast.error(d.message)
            }
        }).catch(error=>{
            setLoading(false)
        })
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Contact Us
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="message"
          label="Message"
          name="message"
          type='text'
          multiline 
          rows={4} 
          autoFocus
          value={formData.message}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          type='text'
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="phone"
          type='number'
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type='email'
          id="email"
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <LoadingButton
          loading={loading}
          type="submit"
          fullWidth
          variant="contained"
          color="primary">
          Submit
        </LoadingButton>
      </form>
    </Container>
  );
}

export default ContactForPlan;
