import { Button, IconButton } from "@mui/material"
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RatulButton from "./ratulButton";
import { HOSTNAME } from "../../constants/constants";
import {toast } from 'react-toastify';


const AssessmentCard = (props)=>{
    const {name, num, duration, code, linkCode, show} = props
    const al = HOSTNAME+'assessment/'+linkCode

    const startAssessment = ()=>{
        document.location.href = "/trainer/live-assessment/"+linkCode
    }
    const copyCode = ()=>{
        navigator.clipboard.writeText(code)
        toast("Copied Assessment Code!")
    }
    const copyLink = ()=>{
        navigator.clipboard.writeText(al)
        toast("Copied Assessment Link!")
    }
    return(
        <div  className="assessment_card" style={{display: show?'flex':'none'}}>
            <div className="assessment_card_item">
                <div className="item_header">Assessment Name</div>
                <div style={{marginTop: 8}}>{name}</div>
            </div>
            <div className="assessment_card_item">
                <div className="item_header">No of Questions</div>
                <div style={{marginTop: 8}}>{num}</div>
            </div>
            <div className="assessment_card_item">
                <div className="item_header">Duration</div>
                <div style={{marginTop: 8}}>{duration} minutes</div>
            </div >
            <div className="assessment_card_item">
                <div className="item_header">Code</div>
                <div style={{display: 'flex', width: '100%', color: '#444'}}><div style={{alignSelf: 'center', fontSize: 15}}>{code}</div><div style={{cursor: 'pointer', marginLeft: 4}}> <IconButton onClick={copyCode} color="secondary" aria-label="Copy"><ContentCopyIcon sx={{width: 18, height: 18}}/></IconButton></div></div>
            </div>
            <div className="assessment_card_item">
            <div><Button onClick = {copyLink} startIcon={<InsertLinkIcon />} size="small" variant="outlined">Copy Link</Button></div>
            </div>
            <div style={{alignSelf: 'center', textAlign: 'center', flex: 1}}>
            {/* <Button sx={{backgroundColor: '#4f4eb6', borderRadius: 12}} onClick = {onClick}  variant="contained">
                Start Assessment
            </Button> */}
            <RatulButton text="Go Live" onClick={startAssessment} />
            </div>
        </div>
    )
}
export default AssessmentCard