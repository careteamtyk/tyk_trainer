import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import IconLabel from '../../widgets/iconLabel';
import './EnterName.css'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimerIcon from '@mui/icons-material/Timer';
import QuizIcon from '@mui/icons-material/Quiz';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
const EnterName = ({asm}) => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const startNow = ()=>{
        navigate('/mock-live/'+asm.linkCode+'/'+encodeURI(name))
    }
    return (
        <div className='mt-enter-name'>
            <h3>{asm.title}</h3>
            <div style={{display: 'flex'}}>
                <IconLabel icon={<QuizIcon />} isMUI={true} label={`${asm.numQns} Questions`}/>
                <IconLabel icon={<TimerIcon />} isMUI={true} label={`${asm.duration} minutes `} mg='12px'/>
            </div>
            <TextField value={name} onChange={e=>setName(e.target.value)} sx={{marginTop: '12px', marginBottom: '12px'}} variant='outlined' size='small' fullWidth type='text' label='Enter Name'/>
            <LoadingButton onClick={startNow} sx={{marginBottom: '16px', marginTop: '16px'}} variant='contained' fullWidth>Start Asssessment</LoadingButton>
        </div>
    );
};
export default EnterName;