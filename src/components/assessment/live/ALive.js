import { Card, CircularProgress } from '@mui/material'
import AppLogo from '../../widgets/appLogo'
import './ALive.css'
import {useEffect, useState} from 'react'
import AssessmentInfo from './widgets/assessmentInfo'
import QuestionBox from './widgets/questionBox'
import Countdown from "react-countdown";
import axios from 'axios'
import {io} from 'socket.io-client'
import { API_ENDPOINT, HEADER_TOKEN } from '../../../constants/constants'
import { answerExists, getAnswers, getAssessment, getCandidateName, isCandidateExists, saveAnswers, shuffleFisherYates } from '../../../utilities/utility'
import { toast } from 'react-toastify'
import CustomCircularP from '../../widgets/customCircularP'
import YesNoDialog from '../../widgets/ratulModal/YesNoDialog'
import { useLocation } from 'react-router-dom'

const ALive = ()=>{
    const location = useLocation()
    const STARTED = "started"
    const UPCOMING = "upcoming"
    const COMPLETED = "completed"
    const LIVE = "LIVE"
    const IN_PROGRESS = "In progress"
    
    const PAGE_LOADING = "page_loading"
    const PAGE_NO_ASSESSMENT = "page_no_assessment"
    const PAGE_ASSESSMENT = "page_assessment"

    const PAGE_GO_ENTER_NAME = "page_go_enter_name"
    const PAGE_GO_COMPLETED = "page_go_completed"

    const [pageState, setPageState] = useState(PAGE_LOADING)
    const loc = document.location.href.replace(/\/+$/, "")
    const keysUrl = loc.split('/')
    const linkCode = keysUrl[5]
    const [name, setName] = useState("")
    const [status, setStatus] = useState("")
    const [timeToCount, setTimeToCount] = useState(0)
    //let timeToCount = 0

    const [cd, setCd] = useState(Date.now())
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [socket, setSocket] = useState(null);
    const [ainfo, setAinfo] = useState({})
    const [myqns, setMyqns] = useState([])
    const [ended, setEnded] = useState(false)
    const [currentQn, setCurrentQn] = useState(1)
    const [dopen, setDopen] = useState(false)





    useEffect(() => {        
        const newSocket = io(API_ENDPOINT, {transports: ['websocket']});
        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket])

    useEffect(()=>{
        if(socket !== null){
            socket.on('end-'+linkCode, m=>{
                setEnded(true)
            })
        }
    }, [socket]) 

    useEffect(() => {
        const preventBack = () => {
          window.history.forward(); 
        }
    
        setTimeout(preventBack, 0);
    
        // Setting event handler
        window.onunload = preventBack;
    
        // Cleanup logic
        return () => {
          window.onunload = null;
        };
      }, []);

    useEffect(()=>{
        /*
            Here candidate session is Checked
        */
        if(isCandidateExists()){
            let cn = getCandidateName()
            if(cn.linkCode === linkCode){
                setName(cn.name)
                loadAssessment()
            }else{
                setPageState(PAGE_GO_ENTER_NAME)
            }
        }else{
            setPageState(PAGE_GO_ENTER_NAME)
        }
    }, [])

    useEffect(()=>{
        /*
           STATUS: UPCOMING, STARTED, COMPLETED
           Here candidate session already exists
       */
       if(status !== ""){
           if(status === UPCOMING){
              setPageState(PAGE_GO_ENTER_NAME)
           }else if(status === COMPLETED){
               setPageState(PAGE_GO_COMPLETED)
           }else{
                 //Here we are in the assessment page

                 //Notify to Trainer u r Live
                  if(socket !== null){
                    let d = {name: name, status: LIVE, score: 0, linkCode: ainfo.linkCode, numAttempted: 0}
                    socket.emit("goLive", d)
                  }

                let ad = ainfo.duration
                let sd = new Date(ainfo.startDate)
                let nd = new Date()
                let remainingTime = (nd.getTime()-sd.getTime())/(1000*60)
                setTimeToCount(ad - remainingTime)
                if(answerExists()){
                    let asm = getAnswers()
                    let size = asm.questions.filter(as=>as.status==='attempted')
                    let indc = size.length
                    if(asm.linkCode === linkCode){
                        if(!ainfo.config.allowBack){
                            if(indc === ainfo.numQns){
                                setCurrentQn(indc-1)
                            }else{
                                if(indc<ainfo.numQns){
                                    setCurrentQn(indc)
                                }
                            }
        
                        }
                        let mas = asm.questions
                        setMyqns(mas)

                        let allCorrect = mas.filter(r=>r.choiceCorrect)
                        let dto = {name: name, linkCode: linkCode, status: IN_PROGRESS, score: allCorrect.length, numAttempted: indc}
                        socket.emit('goLive', dto)
                        
                        setPageState(PAGE_ASSESSMENT)
                    }else{
                        createAnswerSheet(ainfo)
                    }
                }else{
                    createAnswerSheet(ainfo)
                }

               //setPageState(PAGE_ASSESSMENT)
           }
       }
   }, [status])

    useEffect(()=>{
        if(Object.keys(ainfo).length>0){
            if(ainfo.flexible){
                setPageState(PAGE_NO_ASSESSMENT)
            }else{
                setStatus(ainfo.status)
            }
        }
    }, [ainfo])

    useEffect(()=>{
        if(pageState === PAGE_GO_COMPLETED){
            goToCompleted()
        }else if(pageState === PAGE_GO_ENTER_NAME){
            document.location.href = "/assessment/"+linkCode
        }
    }, [pageState])

    function loadAssessment(){
        axios.post(API_ENDPOINT+'student/get-assessment', {linkCode}).then(res=>{
            let d = res.data
            if(d.success){
                setAinfo(d.message)
            }else{
                toast(d.message)
                setPageState(PAGE_NO_ASSESSMENT)
            }
        })
    }
    function createAnswerSheet(asm){
        let sqns = asm.questions
        let myqnsA = []
        if(asm.config.shuffleQuestions){
            myqnsA = shuffleFisherYates(sqns)
        }

        if(asm.config.shuffleOptions){
            myqnsA.map((s, i)=>{
                s.options = shuffleFisherYates(s.options)
            })
        }
        if(myqnsA.length === 0)
            myqnsA = sqns
        myqnsA.map((q, i)=>{
            q.status = "unattempted"
            q.qno = i+1
        })
        setMyqns(myqnsA)
        setPageState(PAGE_ASSESSMENT)
    }
    const Completionist = () => <span>00:00</span>
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            onFinishAssessment()
            return <Completionist />;
        } else {
          // Render a countdown
          return (
            <span> 
              {pad(hours)}:{pad(minutes)}:{pad(seconds)}
            </span>
          );
        }
    }
    const onFinishAssessment = ()=>{
        setDopen(true)
    }
    function pad(n) {
        return (n < 10 ? "0" + n : n)
    }
    const onNoResponse = ()=>{
        setDopen(false)
    }
    useEffect(()=>{
        if(ended){
            finishAction()
        }
    }, [ended])
    const onYesResponse = ()=>{
        setDopen(false)
        finishAction()
    }
    function finishAction(){
        let ans = {}
        ans.name = name
        ans.title = ainfo.title
        ans.duration = ainfo.duration
        ans.linkCode = linkCode
        ans.config = ainfo.config
        ans.answers = myqns
        ans.numQns = ainfo.numQns
        setIsSubmitting(true)
        let allCorrect =  myqns.filter(r=>r.choiceCorrect)
        let numA =  myqns.filter(r=>r.status ==='attempted').length
        ans.score = allCorrect.length
        ans.numAttempted = numA
        axios.post(API_ENDPOINT+'user/save-answers', ans).then(res=>{
            setIsSubmitting(false)
            let d = res.data
            if(d.success){
                // saveAnswers({name: name, completed: true, linkCode: linkCode, questions: myqns})
                goToCompleted()
            }
        })
    }

    function goToCompleted(){
        document.location.href = "/assessment/"+linkCode+"/answer-sheet/"+encodeURI(name)
    }
    return(
        <div className='live_assessment'>
            <CustomCircularP show={pageState === PAGE_LOADING}/>
            <YesNoDialog dopen={dopen} message="Are you sure you want to Finish?" onNoResponse={onNoResponse} onYesResponse={onYesResponse} setDopen={setDopen}/>
            {
            pageState === PAGE_ASSESSMENT?
            <>
                <div className='a-qn-action-box'>
                <div className='a-question_box'>
                    {myqns.map((q, i)=>(
                        <QuestionBox key={i} socket={socket} currentQn={currentQn} setCurrentQn={setCurrentQn} num={ainfo.numQns}  config={ainfo.config} linkCode={linkCode} name={name} qno={(i+1)} ma={myqns} setMa={setMyqns} question={q} show={(i+1)===currentQn}/>
                    ))}
                </div>
                <AssessmentInfo socket={socket} config={ainfo.config} onFinishAssessment={onFinishAssessment} linkCode={linkCode} name={name} a={ainfo} ma={myqns} setMa={setMyqns} currentQn={currentQn} setCurrentQn={setCurrentQn} num={ainfo.numQns} />
                </div>
                <div className='header_box'>
                    <div className='h_info'>
                        <div className='hlogo'>
                            <AppLogo />
                        </div>
                        <div style={{textAlign: 'center', fontStyle: 'italic', marginTop: 16}}>Candidate name : {name}</div>
                        <div style={{textAlign: 'center', marginTop: 16, fontWeight: 600, color: 'rgb(61 60 60)', fontSize: 19}}>
                        {ainfo.title}
                        </div>
                        <div style={{textAlign: 'center', marginTop: 8, fontWeight: 500, color: 'rgb(110 108 108)', fontSize: 15}}>
                            {ainfo.numQns} Questions | {ainfo.duration} minutes
                        </div>
                    </div>
                    <div className='m_info'>
                        Candidate: {name}
                    </div>
                    <div className='count_c'>
                        <Countdown date={cd + timeToCount*60000} renderer={renderer}></Countdown>
                        <div className='count_c_l' style={{fontSize: 14, fontWeight: 400}}>hh:mm:ss</div>
                    </div>
                </div>
            </>:
            <div style={{fontSize: '20px', textAlign: 'center', padding: '16px'}}>
                No Assessment Found!
            </div>
        }
        </div>
    )
}
export default ALive