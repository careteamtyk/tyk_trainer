import './assessment.css'
import { useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { API_ENDPOINT, HEADER_TOKEN } from '../../constants/constants'
import Live from './live/live'
import WaitingForTrainer from './waitingForTrainer'
import {io} from 'socket.io-client'
import IntroHeader from '../widgets/introHeader'
import { deleteCandidate, getAssessment, getCandidateName, isAssessmentExists, isCandidateExists, saveAssessment, saveCandidateName } from '../../utilities/utility'
import NameHelper from './nameHelper'
import { toast } from 'react-toastify'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { LoadingButton } from '@mui/lab'
import CustomCircularP from '../widgets/customCircularP'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
const EnterName = ()=>{


    /*
    
    The pages for assessments:
    1. Enter name (enterName.js), 
    2. Live (Live.js), 
    3. Result page (answerSheet.js) 
    4. ScheduledAssessment (ScheduledAssessment.js)

     
     */


    const STARTED = "started"
    const UPCOMING = "upcoming"
    const COMPLETED = "completed"

    const [key, setKey] = useState(0);
    

    //========= PAGE STATE (pageState) =========
        //State of this Page
        const PAGE_ENTER_NAME = "page_enter_name"
        const PAGE_GO_WAITING = "page_go_waiting"
        const PAGE_COUNTDOWN = "page_countdown"
        const PAGE_INVALID_LINK = "page_invalid_link"
        const PAGE_LOADING = "page_loading"

        //Navigation from this page
        const PAGE_GO_LIVE = "page_go_live"
        const PAGE_GO_COMPLETED = "page_go_completed"
        const PAGE_GO_SCHEDULED = "page_go_scheduled"
    // ============= END PAGE STATE (pageState) ===========

    const loc = document.location.href.replace(/\/+$/, "")
    const keysUrl = loc.split('/')
    const linkCode = keysUrl[4]
    //const a_cname = keysUrl[5].replaceAll('+', ' ')
    const [name, setName] = useState("")
    const [status, setStatus] = useState("")
    //const [started, setStarted] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [ainfo, setAinfo] = useState({})
    const [reload, setReload] = useState(false)
    const [validLink, setValidLink] = useState(true)
    const [nameSubmitting, setNameSubmitting] = useState(false)
    const [socket, setSocket] = useState(null);
    const [pageState, setPageState] = useState("")


    useEffect(() => {        
      const newSocket = io(API_ENDPOINT, {transports: ['websocket']});
      setSocket(newSocket);
      return () => newSocket.close();
    }, [setSocket])

    const goAssessment = ()=>{
        if(name !== ""){
            // if(isCandidateExists()){
            //     let cn = getCandidateName()
            //     if(cn.linkCode === linkCode && cn.name === name){
            //         //document.location.href = "/assessment/"+linkCode+"/answer-sheet/"+encodeURI(name)
            //     }else{
            //        goCandidate()
            //     }
            // }else{
            //     goCandidate()
            // }
            goCandidate()

        }else{
            toast("Please Enter name")
        }
    }

    useEffect(()=>{
        loadDetails()
    }, [])

    useEffect(()=>{
        if(pageState === PAGE_GO_LIVE){
            document.location.href = "/assessment/live/"+linkCode
        }else if(pageState === PAGE_GO_COMPLETED){
            let cn = getCandidateName()
            document.location.href = "/assessment/"+linkCode+"/answer-sheet/"+encodeURI(cn.name)
        }else if(pageState === PAGE_GO_SCHEDULED){
            document.location.href = "/assessment/scheduled/"+linkCode
        }
    }, [pageState])

    useEffect(()=>{
        /*
            flexible: true -> Flexible Assessment: Start time and End time
            flexible: false -> Non-flexible: Controlled by trainer
        */

        if(Object.keys(ainfo).length>0){
            if(ainfo.flexible){
                if(isCandidateExists()){
                    setPageState(PAGE_GO_SCHEDULED)
                }else{
                    setPageState(PAGE_ENTER_NAME)
                }
            }else{
                setStatus(ainfo.status)
            }
        }
    }, [ainfo])

    useEffect(()=>{
         /*
            STATUS: UPCOMING, STARTED, COMPLETED
        */
        if(status !== ""){
            if(status === UPCOMING){
                if(isCandidateExists()){
                    let cn = getCandidateName()
                    if(cn.linkCode === linkCode){
                        setPageState(PAGE_GO_WAITING)
                    }else{
                        setPageState(PAGE_ENTER_NAME)
                    }
                }else{
                    setPageState(PAGE_ENTER_NAME)
                }
            }else if(status === STARTED){
                if(isCandidateExists()){
                    //document.location.href = "/assessment/live/"+linkCode
                    let cn = getCandidateName()
                    if(cn.linkCode === linkCode){
                        setPageState(PAGE_COUNTDOWN)
                    }else{
                        setPageState(PAGE_ENTER_NAME)
                    }
                }else{
                    setPageState(PAGE_ENTER_NAME)
                }
            }else if(status === COMPLETED){
                if(isCandidateExists()){
                    setPageState(PAGE_GO_COMPLETED)
                }else{
                    setPageState(PAGE_ENTER_NAME)
                }
            }else{
                setPageState(PAGE_ENTER_NAME)
            }
        }
    }, [status])

    function goCandidate(){


        //=========== Submit name =============
        setNameSubmitting(true)
        axios.post(API_ENDPOINT+'user/check-candidate-name', {name: name, linkCode: linkCode}).then(res=>{
            let d = res.data
            setNameSubmitting(false)
            if(d.success){
                let toSave = {name: name, linkCode: linkCode}
                saveCandidateName(toSave)
                document.location.reload()
                // let s = ainfo.status
                // if(s === "upcoming"){
                //     let d = {name: name, linkCode: ainfo.linkCode}
                //     socket.emit("joining", d)
                // }else if(s === "started"){
                //     let d = {name: name, linkCode: ainfo.linkCode}
                //     socket.emit("joining", d)
                //     setStarted(true)
                // }else{
                //     document.location.href = "/assessment/"+linkCode+"/answer-sheet/"+encodeURI(name)
                // }
            }else{
                toast(d.message)
            }
        })
        //========== End Submit Name =============
    }

    function loadDetails(){
        /*
            STATUS: UPCOMING, STARTED, COMPLETED
        */
        setPageState(PAGE_LOADING)
        axios.post(API_ENDPOINT+'assessment-details/', {linkCode}).then(res=>{
            let d = res.data
            if(d.success){
                setAinfo(d.message)
                // if(s === "started"){
                //     let startDate = new Date(A.startDate)
                //     let cd = new Date()
                //     let duration = A.duration
                //     let remainingTime = (cd.getTime()-startDate.getTime())/(1000*60)
                //     let timeToCount = duration - remainingTime
                //     if(timeToCount>1){
                //         if(isAssessmentExists()){
                //             let as = getAssessment()
                //             let name = as.name
                //             let lc = as.linkCode
                //             if(lc === A.linkCode){
                //                 setName(name)
                //                 setReload(true)
                //                 setNameSubmitted(true)
                //                 setStarted(true)
                //             }
                //         }
                //     }else{
                //         setStatus(A.status)
                //     }

                // }else{
                //     setStatus(A.status)
                // }
            }else{
                setPageState(PAGE_INVALID_LINK)
            }
        })
    }
    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            setPageState(PAGE_GO_LIVE)
          return <div className="timer">GO...</div>;
        }
      
        return (
          <div className="rdc-timer">
            <div className="rdc-text">Starting in...</div>
            <div className="rdc-value">{remainingTime}</div>
            <div className="rdc-text">seconds</div>
          </div>
        );
      };
    const onGoLive = ()=>{
        setPageState(PAGE_COUNTDOWN)
    }

    return(
    <div>
        {pageState === PAGE_ENTER_NAME?
        <div className="live_intro">
            {Object.keys(ainfo).length>0?<><IntroHeader socket = {socket} ainfo= {ainfo}/>
            {reload?<NameHelper socket={socket} name={name} linkCode={linkCode} />:''}
            </>:''}
                <div className='enter_name'>
                {
                    Object.keys(ainfo).length>0?
                    <>
                    <div style={{textAlign: 'center', fontSize: 20, fontWeight: 600, marginTop: 8, color: '#444'}}>Enter Your Name</div>
                    <div style={{textAlign: 'center', fontSize: 14, marginTop: 2, color: '#777'}}>Your name is your Id. Keep it Unique.</div>
                    <br />
                    <TextField required value={name} onChange={(event)=>setName(event.target.value)} variant="outlined" fullWidth size='small' label='Enter Name'  />
                    <div style={{textAlign: 'center', marginTop: 16}}>
                    <LoadingButton startIcon={<PlayArrowIcon />} onClick={goAssessment} loading={nameSubmitting} loadingPosition='start' sx={{textTransform: 'none', borderRadius: '16px',   padding: '6px 16px'}} variant="contained">
                        Start Assessment    
                    </LoadingButton>
                    </div></>:  
                    <div>just a moment...</div>
                }  
                </div>
        </div>
        :
        pageState === PAGE_GO_WAITING?
        <div> 
            <WaitingForTrainer onGoLive={onGoLive} socket = {socket} ainfo = {ainfo} setAinfo = {setAinfo} linkCode={linkCode} />
        </div>:
        pageState === PAGE_INVALID_LINK?
        <div>
            Invalid Link
        </div>:
        pageState === PAGE_COUNTDOWN?
        <div className='rdc-timer-wrapper'>
        <CountdownCircleTimer
        
        key={key}
        isPlaying
        duration={3}
        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
        onComplete={() => [true, 1000]}
      >
        {renderTime}
      </CountdownCircleTimer> </div>:
        <CustomCircularP show={pageState === PAGE_LOADING}/>
        }
    </div>
    )
}       
export default EnterName