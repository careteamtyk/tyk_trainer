import { Button, Card, CircularProgress } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Countdown from 'react-countdown'
import QRCode from 'react-qr-code'
import { API_ENDPOINT, HEADER_TOKEN } from '../../constants/constants'
import ShareCard from '../widgets/shareCard'
import LoadingButton from '@mui/lab/LoadingButton';
import './liveAssessment.css'
import {toast } from 'react-toastify';

import { io } from "socket.io-client";
import UserModal from './userModal'
import Qsize from '../widgets/qSize'
import TSummaryWidget from '../report/tSummaryWidget'
import CircularProgressWithLabel from './a-widgets/CircularProgressWithLabel'
import LinearProgressWithLabel from './a-widgets/LinearProgressWithLabel'
import { getDateFormat, getHeader } from '../../utilities/utility'
import WaitingList from './waitingList'
const LiveAssessment = ({setCollapse})=>{
    const [socket, setSocket] = useState(null);
    const [showModal, setShowModal] = useState(false)
    const [names, setNames] = useState([])
    const [topics, setTopics] = useState([])
    const [starting, setStarting] = useState(false)
    const [ending, setEnding] = useState(false)
    const [ended, setEnded] = useState(false)
    const [completedList, setCompletedList] = useState([])
  
    const loc = document.location.href.replace(/\/+$/, "")
    const keysUrl = loc.split('/')
    const linkCode = keysUrl[5]
    const LIST_EVENT = 'onNumber-'+linkCode
    const [cd, setCd] = useState(Date.now())
    const [isStarted, setIsStarted] = useState(false)
    const [aduration, setAduration] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [disableEnd, setDisableEnd] = useState(false)
    const [ainfo, setAinfo] = useState({})

    const completedInfo = names.filter(nm=>nm.status==='completed').length
    const progressInfo = names.filter(nm=>nm.status==='In progress').length
    const toStart = names.filter(nm=>nm.status==='waiting' || nm.status==='LIVE').length
    const averageScore = names.length>0? names.map(item=>item.score).reduce((a, b) => a + b, 0)/names.length :0

    useEffect(()=>{
        setCollapse(prev=>!prev)
    }, [])
    function calculateAverageScorePercentage(namesA, totalScore) {
        let sum = 0;
        for (let i = 0; i < namesA.length; i++) {
          sum += namesA[i].score;
        }
        const averageScore = sum / namesA.length;
        const averageScorePercentage = (averageScore / totalScore) * 100;
      
        return Math.round(averageScorePercentage);
    }
      

    
    const above_80 = Object.keys(ainfo).length>0? names.filter(item => (item.score/ainfo.numQns)*100>80).length:0
    const between_40_80 = Object.keys(ainfo).length>0? names.filter(item => (item.score/ainfo.numQns)*100>40 && (item.score/ainfo.numQns)*100<=80).length:0
    const below_40 = Object.keys(ainfo).length>0? names.filter(item => (item.score/ainfo.numQns)*100<40).length:0
    

    useEffect(() => {        
        const newSocket = io(API_ENDPOINT, {transports: ['websocket']});
        setSocket(newSocket);
        return () => newSocket.close();
      }, [setSocket])

    useEffect(()=>{
        loadDetails()
    }, [])
    
    useEffect(()=>{
        if(socket !== null){
            socket.emit("sendAttendants", {linkCode: linkCode})
            socket.on(LIST_EVENT, m=>{
                let tnms = [...m]
                //console.log(completedList)
                let nms = tnms.concat(completedList)
                if(nms.length>0){
                    nms.sort((a, b)=>b.score-a.score)
                }
                setNames(nms)
            })
            const timer = setInterval(() => {
                //Repeat a task here
                //get the latest list 
                socket.emit("sendAttendants", {linkCode: linkCode})
            }, 1000*4);
            return () => {
                clearInterval(timer);
            };
        }
    }, [socket, completedList])

    useEffect(()=>{
        if(isStarted){
            const timer = setInterval(() => {
                //Repeat a task here
                //get the latest list 
                loadCompletedList()
                loadResponses()
            }, 1000*15);
            return () => {
                clearInterval(timer);
            };
        }
    }, [isStarted])

    function loadCompletedList(){
        axios.post(API_ENDPOINT+'user/get-completed-students', {linkCode}).then(res=>{
            let d = res.data
            if(d.success){
                let list = d.message
                let newL = []
                list.map(l=>{
                    newL.push({...l, status: 'completed'})
                })
                setCompletedList(newL)
            }
        })
    }
    const getNumQ = (tp)=>{
        if(Object.keys(ainfo).length>0){
            let num = ainfo.questions.filter(q=>q.topic === tp)
            console.log(num.length)
            return num.length
        }else{
            console.log(ainfo)
            return 0
        }
    }
    function loadResponses(){
        //topic={qa._id} qnum={getNumQ(qa._id)} pc={Math.round((qa.totalCorrect/qa.count)*100)} 
        axios.post(API_ENDPOINT+'trainer/option-response-topic-summary', {linkCode}, getHeader()).then(res=>{
            let d = res.data
            if(d.success){
                let ml = d.message
                const nL = [...topics]
                ml.map(m=>{
                    let ind = nL.findIndex(n=>n.topic=== m._id)
                    nL[ind].pc =  Math.round((m.totalCorrect/m.count)*100)
                })
                //setQs(d.message)
                setTopics(nL)
            }else{
                toast(d.message)
            }
        })
    }
    function loadDetails(){
        setIsLoading(true)
        axios.post(API_ENDPOINT+'trainer/assessment-details/', {linkCode}, HEADER_TOKEN).then(res=>{
            setIsLoading(false)
            let d = res.data
            if(d.success){
                let A = d.message
                let result = A.questions.reduce(function(acc, curr) {
                    // Check if there exist an object in empty array whose CategoryId matches
                    let isElemExist = acc.findIndex(function(item) {
                      return item.topic === curr.topic;
                    })
                    if (isElemExist === -1) {
                      let obj = {};
                      obj.topic = curr.topic;
                      obj.count = 1;
                      obj.pc = 0
                      acc.push(obj)
                    } else {
                      acc[isElemExist].count += 1
                    }
                    return acc;
                  }, [])
                setTopics(result)
                let s = A.status
                if(s === "completed"){
                    window.open(
                        "/trainer/report/"+A.linkCode,
                        '_blank' // <- This is what makes it open in a new window.
                    );
                }else if(s === "started"){
                    let startDate = new Date(A.startDate)
                    let cd = new Date()
                    let duration = A.duration
                    let remainingTime = (cd.getTime()-startDate.getTime())/(1000*60)
                    let timeToCount = duration - remainingTime
                    if(timeToCount>1){
                        setAduration(timeToCount)
                        setCd(Date.now())
                        setIsStarted(true)
                        setAinfo(A)
                    }else{
                        endAssessment(A.linkCode)
                    }
                }else{
                    setAduration(A.duration)
                    setAinfo(A)
                }
            }else{
                toast(d.message)
            }
        })
    }
    const Completionist = () =>{ 
        return <span>00:00</span> 
    }
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            if(!ended){
                endAssessment(ainfo.linkCode)
            }
            setIsStarted(false)
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
    function pad(n) {
        return (n < 10 ? "0" + n : n)
    }
    const startAssessment = ()=>{
        setStarting(true)
        axios.post(API_ENDPOINT+'trainer/update-assessment-to-started', {status: 'started', linkCode: ainfo.linkCode}, HEADER_TOKEN).then(res=>{
            let d = res.data
            setStarting(false)
            if(d.success){
                socket.emit("start", {linkCode: ainfo.linkCode, command: "start"})
                setCd(Date.now())
                setIsStarted(true)
            }
        })
    }
    const endAssessment = (linkCode)=>{
        setEnding(true)
        socket.removeAllListeners(LIST_EVENT)
        axios.post(API_ENDPOINT+'trainer/update-assessment-to-completed', {status: 'completed', linkCode: linkCode}, HEADER_TOKEN).then(res=>{  
            let d = res.data
            setEnding(false)
            setEnded(true)
            if(d.success){

                let nms = [...names]
                nms.map(n=>{n.status='completed' })
                setNames(nms)

                socket.emit("end", {linkCode: linkCode, command: "end"})
                setCd(0)
                setDisableEnd(true)
            }
        })
    }
    const seeAll = ()=>{
        setShowModal(true)
    }
    // const detailReport = ()=>{
    //     //document.location.href="/trainer/report/"+linkCode

    //     window.open(
    //         "/trainer/report/"+linkCode,
    //         '_blank' // <- This is what makes it open in a new window.
    //     );
    // }
    return (
        <div className="live-assessment">
            {showModal?<UserModal names={names} showModal={showModal} setShowModal={setShowModal} />:''}
            {socket && Object.keys(ainfo).length>0?<>
            {/* <JoinHelper names={names} linkCode={ainfo.linkCode} setNames = {setNames} socket={socket} />
            <ScoreHelper names={names} linkCode={ainfo.linkCode} setNames = {setNames} socket={socket} />
            <LeaveHelper names={names} linkCode={ainfo.linkCode} setNames = {setNames} socket={socket} /> */}
            {/* <NumberHelper names={names} linkCode={ainfo.linkCode} setNames = {setNames} socket={socket} /> */}
            </>:''}
                <div style={{flex: 0.35}}>
               
                <div className='live-a-i-b'>            
                       <div style={{display: 'flex', justifyContent: 'center'}}>
                       <img src={ainfo.banner} style={{borderRadius: '50%', width: '72px',height: '72px', objectFit: 'cover'}} alt=""/>
                           <div style={{alignSelf: 'center', marginLeft: '12px'}}>
                            <div style={{fontSize: 19, fontWeight: 600, marginTop: 8, color: '#444', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: '230px'}}>{ainfo.title}</div>
                            <div style={{color: '#777', fontSize: 12}}>{ainfo.date?getDateFormat(new Date(ainfo.date)):''}</div>
                            </div>
                        </div> 
                        <div style={{display: 'table', margin: 'auto'}}>
                        <Qsize numQns={ainfo.numQns} numTopics={ainfo.numTopics} duration={ainfo.duration}/>
                        </div>
                        <div style={{fontSize: 17, marginLeft: 16, marginTop: 16, color: '#444'}}>Participants:</div>
                        <div style={{fontSize: 15, marginLeft: 16, marginTop: 2, color: '#777'}}>{names.length} joined <span style={{color: '#666', fontSize: 16, marginLeft: 12, cursor: 'pointer', userSelect: 'none'}} onClick={seeAll}>see all</span></div>
                        <br />
                        <ShareCard code={ainfo.code} linkCode={linkCode} />

                           <Card sx={{width: 164, marginTop: '20px', marginLeft: 'auto', marginRight: 'auto',  fontSize: 30, color: '#555454', padding: '8px', textAlign: 'center', borderRadius: 16}}>
                            {isStarted?<Countdown date={cd + aduration*60000} renderer={renderer}>
                            </Countdown>:
                            isLoading?
                            '--:--':!ended?`${pad(ainfo.duration)}:00`:`00:00` }
                            <div style={{fontSize: 14, fontWeight: 400}}>hh:mm:ss</div>
                        </Card>

                <div className='live-a-i-do'>
                    <LoadingButton loading={starting} loadingPosition="start"  className='live-a-i-do-s' disabled={isStarted||isLoading || ended} onClick={startAssessment}  variant='contained'>Start Assessment</LoadingButton>
                    <div style={{width: 20}}></div>
                    <LoadingButton  loading={ending} loadingPosition="start" className='live-a-i-do-e'  disabled={!isStarted||isLoading || ended} onClick={()=>endAssessment(ainfo.linkCode)} variant='contained'>End Assessment</LoadingButton>
                </div>
                <a style={{pointerEvents: ended?'initial':'none'}} href={"/trainer/report/"+linkCode}><div style={{marginTop: 24, userSelect: 'none', cursor: 'pointer', marginLeft: 'auto', marginRight: 'auto', color: ended?'blue':'darkgray', display: 'table'}}>
                    View detailed Report
                </div> </a>
                <br /> 
            </div>
                </div>
                <div style={{flex: 0.65, overflowY: 'auto'}}>
                    { (isStarted || ended)?
                        <>
                   <div style={{display: 'flex', position: 'relative'}}>
                        <div style={{background: 'white', height: 148, marginLeft: '12px', borderRadius: 10, flex: 1, padding: '8px', display: 'flex'}}>
                            <div style={{display: 'flex', alignSelf: 'center'}}>
                                <div style={{border:'17px solid #3667e7', width: '120px', height: '120px', borderRadius: '50%', display: 'flex', textAlign: 'center', justifyContent: 'center'}}>
                                    <div style={{alignSelf: 'center'}}>
                                        <div style={{ fontSize: '20px', fontWeight: 600, color: '#445362'}}>{names.length}</div>
                                        <div style={{fontSize: '11px', fontWeight: 600}}>Participants</div>
                                    </div>
                                </div>
                                <div style={{alignSelf: 'center', display: 'flex'}}>
                                    <div style={{marginLeft: '8px'}}>
                                    <CircularProgressWithLabel color='#85c88a'  value={completedInfo} />   
                                    <div style={{fontSize: '12px', fontWeight: 600}}>Completed</div>
                                    </div>
                                    <div style={{marginLeft: '8px'}}>
                                    <CircularProgressWithLabel  color='#dbab4d' value={toStart} />  
                                    <div style={{fontSize: '12px', fontWeight: 600}}>To Start</div>
                                    </div>
                                    <div style={{marginLeft: '8px'}}>    
                                    <CircularProgressWithLabel color='#d82e30'  value={progressInfo} />    
                                    <div style={{fontSize: '12px', fontWeight: 600}}>In Progress</div>
                                    </div>
                                </div>        
                            </div>           
                        </div>
                       <div style={{background: 'white', position: 'relative', marginLeft: 12, marginRight: '12px', height: 148, borderRadius: 10, flex: 1, display: 'flex'}}>
                       <div style={{display: 'flex', alignSelf: 'center', marginLeft: '8px'}}>
                                <div style={{border: '17px solid #3667e7', width: '120px', height: '120px', borderRadius: '50%', display: 'flex', alignSelf: 'center', textAlign: 'center', justifyContent: 'center'}}>
                                    <div style={{alignSelf: 'center'}}>
                            
                                       <div style={{ fontSize: '20px', fontWeight: 600, color: '#445362'}}>{calculateAverageScorePercentage(names, ainfo.numQns)}%</div>
                                        <div style={{fontSize: '11px', fontWeight: 600}}>Average</div>
                                    </div>
                                </div>
                                <div style={{alignSelf: 'center'}}>
                                    <div style={{marginLeft: '8px', display: 'flex'}}>
                                        <div style={{fontSize: '13px', fontWeight: 600, alignSelf: 'center', flex: 1}}>Above 80%</div>
                                        <CircularProgressWithLabel color='#85c88a'  value={above_80} />   
                                    </div>
                                    <div style={{marginLeft: '8px', display: 'flex', margin: '8px 0 8px 12px'}}>
                                        <div style={{fontSize: '13px', fontWeight: 600, alignSelf: 'center', flex: 1}}>Between 40%-80%</div>
                                        <CircularProgressWithLabel color='#dbab4d'  value={between_40_80}/>  
                                    </div>
                                    <div style={{marginLeft: '8px', display: 'flex'}}>    
                                        <div style={{fontSize: '13px', fontWeight: 600, alignSelf: 'center', flex: 1}}>Below 40%</div>
                                        <CircularProgressWithLabel color='#d82e30'  value={below_40} />    
                                    </div>
                                </div>        
                            </div>   
                       </div> 
                   </div>
                   <div className='candidate_list_live'>
                   <table>
                        <tr><th>Rank</th><th>Participant Name</th><th>Status</th></tr>
                         {
                            names.map((n, i)=><tr><td className='serial_col'>{i+1}</td>
                                <td className='name_col'>
                                <div style={{fontWeight: 600, color: '#444'}}>{n.name}</div>
                                <LinearProgressWithLabel value={(parseInt(n.numAttempted)/parseInt(ainfo.numQns))*100}/>
                                </td>
                                <td>{n.status.charAt(0).toUpperCase()+n.status.slice(1)}</td></tr>)
                         }
                       </table>
                   </div>
                   <div style={{display: 'block', borderRadius: 12, background: 'white', height: '180px', margin: '12px', padding: '12px'}}>
                    <div style={{display: 'flex', color: '#777', fontSize: 17}}>
                       Topic Summary
                    </div>
                    {
                        topics.map(t=>(
                            <TSummaryWidget topic={t.topic} qnum={t.count} pc={t.pc} size='small'/>
                        ))
                    }
                   </div>
                   </>:
                   <WaitingList names={names} setNames={setNames}/>
                    }
                </div>
        </div>
    )
}
export default LiveAssessment