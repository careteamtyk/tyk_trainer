import { Button } from '@mui/material'
import './myAssessment.css'
import Qsize from './qSize';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
const MyAssessmentC = (props)=>{
    const {assessment} = props
    let status = assessment.status
    let statusToShow = status==="completed"?"View Report":
                        status === "started"?"Started":"Start Assessment"
    function getDateFormat(d){
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let y = d.getFullYear()
        let dd = '0'+d.getDate()
        let h = '0'+d.getHours()
        let min = '0'+d.getMinutes()
        return dd.slice(-2)+' '+months[d.getMonth()]+' '+y+', '+h.slice(-2)+':'+min.slice(-2)
    }  
    const onClick = ()=>{
        if(status === "completed"){
            document.location.href = "/trainer/report/"+assessment.linkCode
        }else{
            document.location.href = "/trainer/live-assessment/"+assessment.linkCode
        }
    }
    const onRecreate = ()=>{
        document.location.href = "/trainer/create-assessment/recreate/"+assessment.linkCode
    }
    return(
        <div className='my-assessment-card'> 
            <img src={assessment.banner} style={{borderRadius: '50%', width: '96px',height: '96px', objectFit: 'cover'}} alt=""/>
            <div style={{flex: 1, marginLeft: 16, alignSelf: 'center'}}>
                <div style={{fontSize: 17, fontWeight: 600, color: '#444'}}>{assessment.title}</div>
                <div style={{color: '#666', fontSize: 12}}>{assessment.createdOn?getDateFormat(new Date(assessment.createdOn)):''}</div>
                <Qsize numQns={assessment.numQns} numTopics={assessment.numTopics} duration={assessment.duration}/>             
            </div>
            <div className='a-card-action'>
            
                <Button onClick={onClick} variant="outlined">{statusToShow}</Button>
                
                <div style={{marginTop: '16px'}}>
                    <Button startIcon={<BorderColorIcon />} onClick={onRecreate} variant="outlined">Recreate</Button></div>
            
            </div>
        </div>
    )
}
export default MyAssessmentC