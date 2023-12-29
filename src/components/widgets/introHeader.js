import './introHeader.css'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import appLogo from '../../assets/svgs/applogo.svg'
import IconLabelCom from './iconLabelCom'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import TopicIcon from '@mui/icons-material/Topic';
import { useEffect } from 'react';
const IntroHeader = (props)=>{
    const {ainfo} = props
    return(
        <div className='intro_header'>
        <img src={appLogo} alt="" style={{height: 52, marginLeft: 12}}/>
        <div className='intro_a_details'>
        <div style={{fontSize: 17, fontWeight: 600, color: '#444'}}>{ainfo.title}</div>
        <div style={{color: '#444', marginTop: 8, display: 'flex'}}>
            <IconLabelCom icon = {<QuestionAnswerIcon sx={{color: '#777', fontSize: 17}} />} label={`${ainfo.numQns} Questions`} /> 
            <IconLabelCom icon = {<TopicIcon sx={{color: '#777', fontSize: 17, marginLeft: '14px'}} />} label={`${ainfo.numTopics} Topics`} /> 
            <IconLabelCom icon = {<AccessTimeIcon sx={{color: '#777', fontSize: 17, marginLeft: '14px'}} />} label={`${ainfo.duration} minutes`} /> 
        </div>
        </div>
        {/* <div style={{paddingRight: 16, alignSelf: 'center', color: 'green'}}>{`Assessment is ${ainfo.status.charAt(0).toUpperCase()+ainfo.status.slice(1)}`}</div> */}
        </div>
    )
}
export default IntroHeader