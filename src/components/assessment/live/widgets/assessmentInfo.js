import { Button, Card, CircularProgress } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import './questionBox.css'
import { ArrowBackIosNew } from '@mui/icons-material'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_ENDPOINT } from '../../../../constants/constants'
const AssessmentInfo = (props)=>{
    const {ended, socket, config, currentQn, setCurrentQn, num, onFinishAssessment, linkCode, ma, setMa, a, name} = props
    let attemptedQns = ma.filter(a=>a.status==="attempted")
    
    const goNext = ()=>{
        if(currentQn<num)
            setCurrentQn(currentQn+1)
    }
    const goPrev = ()=>{
        if(currentQn>1)
            setCurrentQn(currentQn-1)
    }
    return(
        <div className="live-assessment_info">
             <div style={{flex: 1, alignSelf: 'center', justifyContent: 'start', display: 'flex', paddingLeft: 8}}>
                <Card sx={{padding: '10px', borderRadius: 12, fontSize: 16, fontWeight: 600, color: '#666464'}}>{attemptedQns.length}/{num}</Card>
            </div>
            {config.allowBack? <div style={{alignSelf: 'center', display: 'flex', gap: '16px'}}>
            {currentQn>1?<Button size='small' sx={{textTransform: 'none', borderRadius: '16px'}} onClick = {goPrev} variant="contained" startIcon={<ArrowBackIosNew />}>
                    Prev
            </Button>:''}
            {currentQn<a.numQns?<Button size='small' sx={{textTransform: 'none', borderRadius: '16px'}} onClick = {goNext} variant="contained" endIcon={<ArrowForwardIosIcon />}>
                    Next
            </Button>:''}
             </div>:''}
             <div className='f_finish'>
             <Button sx={{textTransform: 'none', borderRadius: '16px', marginLeft: 4,  padding: '4px 16px'}} onClick = {onFinishAssessment} variant="outlined">
                    Finish
            </Button>
            </div>
        </div>
    )
}
export default AssessmentInfo