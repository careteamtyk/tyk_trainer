import { Button, Card, CircularProgress } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import './questionBox.css'
import { ArrowBackIosNew } from '@mui/icons-material'
const AssessmentInfo = (props)=>{
    const {config, currentQn, setCurrentQn, num, onFinishAssessment, ma, a} = props
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
        <div className="assessment_info">
             <div style={{flex: 1, alignSelf: 'center', justifyContent: 'start', display: 'flex', paddingLeft: 8}}>
                <Card sx={{padding: '10px', borderRadius: 12, fontSize: 16, fontWeight: 600, color: '#666464'}}>{attemptedQns.length}/{num}</Card>
            </div>
            {<div style={{alignSelf: 'center'}}>
            {currentQn>1?<Button sx={{textTransform: 'none', borderRadius: '16px'}} onClick = {goPrev} variant="contained" startIcon={<ArrowBackIosNew />}>
                    Prev
            </Button>:''}
            {currentQn<a.numQns?<Button className='a_next' onClick = {goNext} variant="contained" endIcon={<ArrowForwardIosIcon />}>
                    Next
            </Button>:''}
             </div>}
             <div className='f_finish'>
             <Button sx={{textTransform: 'none', borderRadius: '16px', marginLeft: 4,  padding: '4px 16px'}} onClick = {onFinishAssessment} variant="outlined">
                    Finish
            </Button>
            </div>
        </div>
    )
}
export default AssessmentInfo