import { Card, CircularProgress } from '@mui/material'
import AppLogo from '../../widgets/appLogo'
import './live.css'
import {useEffect, useState} from 'react'
import AssessmentInfo from './widgets/assessmentInfo'
import QuestionBox from './widgets/questionBox'
import Countdown from "react-countdown";
import axios from 'axios'
import { API_ENDPOINT, HEADER_TOKEN } from '../../../constants/constants'
import { answerExists, getAnswers, getAssessment, shuffleFisherYates } from '../../../utilities/utility'
const Live = (props)=>{
    const {name, ainfo, setAinfo, socket, linkCode} = props
    const [cd, setCd] = useState(Date.now())
    const [isSubmitting, setIsSubmitting] = useState(false)
    let ad = ainfo.duration
    let sd = new Date(ainfo.startDate)
    let nd = new Date()
    let remainingTime = (nd.getTime()-sd.getTime())/(1000*60)
    let timeToCount = ad - remainingTime
    const [myqns, setMyqns] = useState([])

    const [ended, setEnded] = useState(false)
    useEffect(()=>{
        socket.on('end-'+linkCode, m=>{
            setEnded(true)
        })
    }, [socket]) 

    const [currentQn, setCurrentQn] = useState(1)
    useEffect(()=>{
        if(answerExists()){
            let asm = getAnswers()
            if(asm.name === name && asm.linkCode === linkCode){
                if(!ainfo.config.allowBack){
                    let size = asm.filter(as=>as.status==='attempted')
                    let indc = size.length
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
            }else{
                createAnswerSheet(ainfo)
            }
        }else{
          createAnswerSheet(ainfo)
        }
    }, [])
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
              {pad(minutes)}:{pad(seconds)}
            </span>
          );
        }
    }
    const onFinishAssessment = ()=>{
        let ans = {}
        ans.name = name
        ans.title = ainfo.title
        ans.duration = ainfo.duration
        ans.linkCode = linkCode
        ans.config = ainfo.config
        ans.answers = myqns
        ans.numQns = ainfo.numQns
        ans.createdOn = ainfo.createdOn
        setIsSubmitting(true)
        axios.post(API_ENDPOINT+'user/save-answers', ans).then(res=>{
            setIsSubmitting(false)
            let d = res.data
            if(d.success){
                document.location.href = "/assessment/"+linkCode+"/answer-sheet/"+encodeURI(name)
            }
        })
    }
    function pad(n) {
        return (n < 10 ? "0" + n : n)
    }
    return(
        <div className='live_assessment'>
              {isSubmitting?<div style={{position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 12}}><CircularProgress /></div>:''}

            { Object.keys(myqns).length>0?
            <>
            <div className='question_box'>
                {myqns.map((q, i)=>(
                    <QuestionBox currentQn={currentQn} setCurrentQn={setCurrentQn} num={ainfo.numQns}  config={ainfo.config} linkCode={linkCode} name={name} qno={(i+1)} ma={myqns} setMa={setMyqns} question={q} show={(i+1)===currentQn}/>
                ))}
                <AssessmentInfo config={ainfo.config} onFinishAssessment={onFinishAssessment} ended={ended} linkCode={linkCode} name={name} a={ainfo} ma={myqns} setMa={setMyqns} currentQn={currentQn} setCurrentQn={setCurrentQn} num={ainfo.numQns} />
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
                    <div className='count_c_l' style={{fontSize: 14, fontWeight: 400}}>minutes left</div>
                </div>
            </div>
            </>:
            <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                <CircularProgress />
            </div>
            }
        </div>
    )
}
export default Live