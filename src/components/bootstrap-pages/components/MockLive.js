import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { API_ENDPOINT } from '../../../constants/constants';
import AppLogo from '../../widgets/appLogo';
import CustomCircularP from '../../widgets/customCircularP';
import YesNoDialog from '../../widgets/ratulModal/YesNoDialog';
import AssessmentInfo from './mock-widgets/assessmentInfo';
import QuestionBox from './mock-widgets/questionBox';
import './MockLive.css'
import applogo from '../../../assets/svgs/applogo.svg'
import aprofile from '../../../assets/images/aprofile.png'
import AnswerBox from '../../assessment/live/widgets/answerBox';
import MockTestResponseSheet from './MockTestResponseSheet';
const MockLive = () => {
    const loc = document.location.href.replace(/\/+$/, "")
    const keysUrl = loc.split('/')
    const name = decodeURI(keysUrl[5])
    const linkCode = decodeURI(keysUrl[4])
    const [mockTest, setMockTest] = useState({})
    const [loading, setLoading] = useState(false)
    const [currentQn, setCurrentQn] = useState(1)
    const [cd, setCd] = useState(Date.now())
    const [myqns, setMyqns] = useState([])
    const [dopen, setDopen] = useState(false)
    const [ansTest, setAnsTest] = useState({})
    const ASSESSMENT = "assessment"
    const NOT_ENUF_QUESTIONS = "No enough Questions in this category"
    const RESULT = "result"
    const [currentView, setCurrentView] = useState(ASSESSMENT)
    const [noAssessmentMessage, setNoAssessmentMessage] = useState('')
    useEffect(()=>{
        getMockTest()
    }, [])
    function getMockTest(){
        setLoading(true)
        axios.get(API_ENDPOINT+'get-mock-test/'+linkCode).then(res=>{
            setLoading(false)
            let d = res.data
            if(d.success){
                const mockT = d.message
                if(mockT.allquestions.length >= mockT.numQns){
                    setMockTest(mockT)
                    const qns = mockT.allquestions
                    qns.map(qn=>{qn.status='unattempted'})
                    setMyqns(qns)
                }else{
                    setNoAssessmentMessage(NOT_ENUF_QUESTIONS)
                }
            }else{
                setNoAssessmentMessage(d.message)
            }
        })        
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
    function pad(n) {
        return (n < 10 ? "0" + n : n)
    }
    const onFinishAssessment = ()=>{
        //console.log(myqns)

        setDopen(true)
    }
    const onNoResponse = ()=>{
        setDopen(false)
    }
    const onYesResponse = ()=>{
        let finalMock = {...mockTest}
        finalMock.candidate_name = name
        finalMock.allquestions = myqns
        setLoading(true)
        axios.post(API_ENDPOINT+'save-mocktest', finalMock).then(res=>{
            setLoading(false)
            setAnsTest(finalMock)
            setCurrentView(RESULT)
            setDopen(false)
        })
    }
    return (
        <div className='mock-live'>
             <YesNoDialog dopen={dopen} message="Are you sure you want to Finish?" onNoResponse={onNoResponse} onYesResponse={onYesResponse} setDopen={setDopen}/>
            <CustomCircularP show= {loading}/>
            
            {noAssessmentMessage === ''?
                <>{
                    !loading  && Object.keys(mockTest).length>0 &&
                    currentView === ASSESSMENT?
                    <>
                        <div className='question_box'>
                            {myqns.map((q, i)=>(
                                <QuestionBox key={i}  currentQn={currentQn} setCurrentQn={setCurrentQn} num={mockTest.numQns}  config={mockTest.config} linkCode={linkCode} name={name} qno={(i+1)} ma={myqns} setMa={setMyqns} question={q} show={(i+1)===currentQn}/>
                            ))}
                            <AssessmentInfo config={mockTest.config} onFinishAssessment={onFinishAssessment} linkCode={linkCode} name={name} a={mockTest} ma={myqns} setMa={setMyqns} currentQn={currentQn} setCurrentQn={setCurrentQn} num={mockTest.numQns} />
                        </div>
                        <div className='header_box'>
                            <div className='h_info'>
                                <div className='hlogo'>
                                    <AppLogo />
                                </div>
                                <div style={{textAlign: 'center', fontStyle: 'italic', marginTop: 16}}>Candidate name : {name}</div>
                                <div style={{textAlign: 'center', marginTop: 16, fontWeight: 600, color: 'rgb(61 60 60)', fontSize: 19}}>
                                {mockTest.title}
                                </div>
                                <div style={{textAlign: 'center', marginTop: 8, fontWeight: 500, color: 'rgb(110 108 108)', fontSize: 15}}>
                                    {myqns.length} Questions | {mockTest.duration} minutes
                                </div>
                            </div>
                            <div className='m_info'>
                                Candidate: {name}
                            </div>
                            <div className='count_c'>
                                <Countdown date={cd + mockTest.duration*60000} renderer={renderer}></Countdown>
                                <div className='count_c_l' style={{fontSize: 14, fontWeight: 400}}>minutes left</div>
                            </div>
                        </div>
                    </>:
                    <>
                       {Object.keys(ansTest).length>0 && <MockTestResponseSheet mockTest={ansTest} />}
                    </>
                }</>:
                <div style={{ position: 'fixed',
                top: '50%',
                left: '50%',
                borderRadius: '8px',
                transform: 'translate(-50%, -50%)',
                padding: '20px',
                backgroundColor: 'lightgrey',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                fontSize: '18px'}}>{noAssessmentMessage}</div>
            }
        </div>
    );
};

export default MockLive;