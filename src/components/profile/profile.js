import React, { useEffect, useState } from 'react';
import './profile.css'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Button, CircularProgress, IconButton, TextField } from '@mui/material';
import { useRef } from 'react';
import { API_ENDPOINT } from '../../constants/constants';
import axios from 'axios';
import { getDateFormat, getHeader } from '../../utilities/utility';
import { toast } from 'react-toastify';
import CustomCircularP from '../widgets/customCircularP';
const Profile = () => {
    const DEFAULT_PROFILE_PIC = '/logo192.png'
    const file_inp = useRef()
    const [uploadLoading, setUploadLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [mprofile, setMprofile] = useState({})

    useEffect(()=>{
        loadProfile()
    }, [])

    const onImgSelect = event=>{
        const [file] = file_inp.current.files
        if(file){
            let fd = new FormData()
            fd.append("image", file)
            setUploadLoading(true)
            axios.post(API_ENDPOINT+'trainer/upload-profile-pic', fd, getHeader()).then(res=>{
                let d = res.data
                setUploadLoading(false)
                if(d.success){
                    //
                    let url = d.message
                    setMprofile({...mprofile, profile_pic: url})
                }else{
                    toast(d.message)
                }
            })
        
        }
    }
    function loadProfile(){
        setLoading(true)
        axios.get(API_ENDPOINT+'trainer/get-trainer-profile', getHeader()).then(res=>{
            setLoading(false)
            let d = res.data
            if(d.success){
                setMprofile(d.message)
            }
        })

    }
    const chooseImg =()=>{
        if(!uploadLoading)
            file_inp.current.click()
    }
    const handleFormChange = (e)=>{
        setMprofile({...mprofile, [e.target.name]: e.target.value})
    }
    const handleSubmit = ()=>{
        setLoading(true)
        axios.post(API_ENDPOINT+'trainer/update-profile', mprofile, getHeader()).then(res=>{
            setLoading(false)
            let d = res.data
            if(d.success){
                toast(d.message)
            }
        })
    }
    return (
        <div className='trainer-profile'>
            <CustomCircularP show={loading}/>
             <input onChange={onImgSelect} ref={file_inp} type="file" accept="image/*" style={{display: 'none'}} />
            {Object.keys(mprofile).length>0?
                <>
                <div className='tp-header'>
                    <div className='tp-img-c'>
                    <img src={mprofile.profile_pic?mprofile.profile_pic:DEFAULT_PROFILE_PIC} className='tp-img' />
                    <div className='tp-img-cover'></div>
                    <IconButton onClick={chooseImg} className='tp-img-action'>{ uploadLoading? <CircularProgress />:<CameraAltIcon />  }</IconButton>
                    </div>
                </div>
                <div style={{display: 'flex', borderBottom: '1px solid #ddd', margin: '0 8px'}}>
                    <div style={{fontSize: '16px', flex: 1, alignSelf: 'center', fontWeight: 600, marginTop: '76px', paddingLeft: '16px'}}>
                        About You
                    </div>
                    <div style={{alignSelf: 'center', fontSize: '14px', fontStyle: 'italic'}}>Joined On {getDateFormat(new Date(mprofile.createdOn))}</div>
                </div>
                <div style={{ padding: '16px'}}>
                    <TextField variant='standard' name='name' value={mprofile.name} onChange={handleFormChange}  label='Full Name' fullWidth sx={{margin: '10px 0'}}/>
                    <TextField variant='standard' name='email' value={mprofile.email} onChange={handleFormChange}  label='Email' fullWidth sx={{margin: '10px 0'}}/>
                    <TextField variant='standard' value={mprofile.phone} label='Phone' disabled fullWidth sx={{margin: '10x 0'}}/>
                    <TextField variant='standard' value={mprofile.plan.name} label='Current Plan' disabled fullWidth sx={{margin: '10px 0'}}/>
                <Button onClick={handleSubmit} variant='outlined' fullWidth sx={{margin: '12px 0'}}>Update</Button>
                </div>
                </>:
                <></>
            }
        </div>
    );
};

export default Profile;