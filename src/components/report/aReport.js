import { Button, CircularProgress } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { API_ENDPOINT, HEADER_TOKEN } from '../../constants/constants'
import { getDateFormat } from '../../utilities/utility'
import NumContainer from '../widgets/numContainer'
import './aReport.css'
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TabBtn from './tabBtn'
import PrintIcon from '@mui/icons-material/Print';
import EmptyContent from '../widgets/emptyContent'
import CandidateSummary from './candidateSummary'
import TopicSummary from './topicSummary'
import PerformanceSummary from './performanceSummary'
import QuestionsSummary from './questionsSummary'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useNavigate } from 'react-router-dom'
import { green } from '@mui/material/colors'
const AReport = ()=>{
    const navigate = useNavigate()
    const loc = document.location.href.replace(/\/+$/, "")
    const keysUrl = loc.split('/')
    const [avScore, setAvScore] = useState('...')
    const [responseList, setResponseList] = useState([])
    const linkCode = keysUrl[5]
    const [ainfo, setAinfo] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [ctab, setCtab] = useState("Candidate Summary")
    const tabnames = ["Candidate Summary", "Topic Summary", "Performance Summary", "Question Summary"]

    useEffect(()=>{
        loadDetails()
    }, [])

    useEffect(()=>{
        if(Object.keys(ainfo).length >0 && responseList.length>0){
            let av = responseList.reduce((total, next) => total + (next.totalCorrect/ainfo.questions.length)*100, 0) /responseList.length;
            setAvScore(Math.round(av))
        }
    }, [ainfo, responseList])
    function loadDetails(){
        setIsLoading(true)
        axios.post(API_ENDPOINT+'trainer/get-assessment', {linkCode}, HEADER_TOKEN).then(res=>{
            setIsLoading(false)
            let d = res.data
            if(d.success){
                setAinfo(d.message)
            }
        })
    }
    const onPrint = ()=>{
        // var divContents = document.getElementById("report-content").innerHTML;
        // var a = window.open('', '', 'height=700, width=1200');
        // a.document.write('<html>');
        // a.document.write('<body >');
        // a.document.write(divContents);
        // a.document.write('</body></html>');
        // a.document.close();
        // a.print();
        //window.print()
        window.open(API_ENDPOINT+'trainer/generate-report/'+linkCode, '_blank', 'noreferrer')
    }
    return(
        <div className="a-report">
            {
                !isLoading?<div>
                    <div className='a-report-h'>
                        <div style={{display: 'flex', flex: 1}}>
                           <img src={ainfo.banner} style={{borderRadius: '50%', width: '72px',height: '72px', objectFit: 'cover'}} alt=""/>
                            <div style={{alignSelf: 'center', marginLeft: '12px'}}>
                            <div style={{fontSize: 19, fontWeight: 600, marginTop: 8, color: '#444', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: '230px'}}>{ainfo.title}</div>
                            <div style={{color: '#777', fontSize: 12}}>{ainfo.date?getDateFormat(new Date(ainfo.date)):''}</div>
                            </div>
                        </div>
                        <div style={{alignSelf: 'center', marginRight: '20px'}}>
                            <div style={{display: 'table', fontSize: '20px', margin: 'auto', fontWeight: 600, color: 'green'}}>{avScore} %</div>
                            <div style={{color: '#777'}}>Average Score</div>
                        </div>
                        <div style={{alignSelf: 'center', display: 'flex', justifyContent: 'center'}}>
                            <div><NumContainer icon={<QuizIcon fontSize='large' sx={{color: '#777'}}/>} num={ainfo.numQns} label="Questions" /></div>
                            <div style={{marginLeft: '24px', marginRight: '24px'}}><NumContainer icon={<AssignmentIcon fontSize='large' sx={{color: '#777'}}/>} num={ainfo.numTopics} label="Topics" /></div>
                            <div><NumContainer icon={<AccessTimeIcon fontSize='large' sx={{color: '#777'}}/>} num={ainfo.duration} label="minutes"/></div>
                        </div>
                    </div>
                    <div className='a-report-ac'>
                        {
                            tabnames.map(t=>(
                                <div className='a-report-abc'>
                                    <TabBtn onClick={()=>setCtab(t)} label={t} isSelected={ctab===t}/>
                                </div>
                            ))
                        }
                        <div className='a-report-abc'>
                            <Button onClick={onPrint} startIcon={<CloudDownloadIcon />} variant="outlined">Download Report</Button>
                        </div>
                    </div>
                        <div id="report-content" style={{height: '60vh', borderRadius: '16px'}}>
                            {
                                ctab===tabnames[0]?
                                <CandidateSummary setResponseList={setResponseList} a={ainfo} linkCode={linkCode} setAvScore={setAvScore}/>:
                                ctab===tabnames[1]?
                                <TopicSummary questions={ainfo.questions} linkCode={ainfo.linkCode}/>:
                                ctab===tabnames[2]?
                                <PerformanceSummary questions={ainfo.questions} linkCode={ainfo.linkCode}/>:
                                <QuestionsSummary questions={ainfo.questions} linkCode={ainfo.linkCode}/>
                            }
                        </div>

                </div>:
                <CircularProgress />
            }
                
        </div>
    )
}
export default AReport