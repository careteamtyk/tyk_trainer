import g1 from '../../assets/images/graph1.png'
import g2 from '../../assets/images/graph2.png'
import { Assessment } from '@mui/icons-material'
import AssessmentCard from '../widgets/assessmentCard';
import bannerImg from '../../assets/images/banner_img.jpg'
import DataCard from '../widgets/dataCard'
import { Chart } from "react-google-charts"
import { deleteToken, getHeader, getMonth, getName, getPhone, getToken } from '../../utilities/utility';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINT, HEADER_TOKEN, MONTHS } from '../../constants/constants';
import { CircularProgress } from '@mui/material';
import EmptyContent from '../widgets/emptyContent'
import { ShimmerButton, ShimmerContentBlock, ShimmerTable } from "react-shimmer-effects";
import InfoCard from '../widgets/infoCard';
import { CircularProgressbar } from 'react-circular-progressbar';

const Dashboard = ({planData})=>{
  const [isAl, setIsAl] = useState(false)
  const [cCard, setCCard] = useState("")
  const [numAssessments, setNumAssessments] = useState('...')
  const [numQuestions,setNumQuestions] = useState('...')
  const [numTopics, setNumTopics] = useState('...')
  const [dataA, setDataA] = useState([])
  const [dataH, setDataH] = useState([])
  const [aOcurrentYear, setAoCurrentYear] = useState('2023')
  const [hOcurrentYear, setHoCurrentYear] = useState('2023')
  

  const [todaysAssessmentLoaded, setTodaysAssessmentLoaded] = useState(false)

  const assessmentOverviewOptions = {
    chart: {
      title: "No. of Assessments",
      subtitle: `Assessments Overview for the year ${aOcurrentYear}`,
    },
  }
  const headCountsOverviewOptions = {
    chart: {
      title: "No. of Headcounts",
      subtitle: `Headcounts Overview for the year ${hOcurrentYear}`,
    },
  };

  useEffect(()=>{
      loadTodaysAssessment()
      checkUser()
      getAssessmentNum()
      getQuestionsNum()
      getTopicsNum()
  }, [])
  useEffect(()=>{
    getAssessmentOverview()
  }, [aOcurrentYear])

  useEffect(()=>{
    getHeadCountsOverview()
  }, [hOcurrentYear])

  function loadTodaysAssessment(){
    setTodaysAssessmentLoaded(false)
    axios.post(API_ENDPOINT+'trainer/todays-assessment', {}, HEADER_TOKEN).then(res=>{
      const d = res.data
      console.log(d)
      setTodaysAssessmentLoaded(true)
      if(d.success){
        setCCard(d.message.length>0?d.message[0]:"")
      }else{
        if(!d.auth){
          deleteToken()
          document.location.href='/login'
        }
      }
    })
  }
  function checkUser(){
     if(getName() === null || getPhone()===null){
        deleteToken()
        document.location.href='/login'
     }
    axios.post(API_ENDPOINT+'trainer/check-user', {}, HEADER_TOKEN).then(res=>{
      let d = res.data
      if(!d.success){
        deleteToken()
        document.location.href='/login'
      }
    })
  }
  function getAssessmentNum(){
    axios.get(API_ENDPOINT+'trainer/get-num-asm', HEADER_TOKEN).then(res=>{
        let d = res.data
        if(d.success){
          setNumAssessments(d.message)
        }
    })
  }
  function getQuestionsNum(){
    axios.get(API_ENDPOINT+'trainer/get-num-qns', HEADER_TOKEN).then(res=>{
      let d = res.data
      if(d.success){
        setNumQuestions(d.message)
      }
    })
  }
  function getTopicsNum(){
    axios.get(API_ENDPOINT+'trainer/get-num-topics', HEADER_TOKEN).then(res=>{
      let d = res.data
      if(d.success){
        setNumTopics(d.message)
      }
    })
  }
  function getAssessmentOverview(){
      axios.post(API_ENDPOINT+'trainer/assessment-overview',{year: aOcurrentYear}, getHeader()).then(res=>{
        let d = res.data
        if(d.success){
            let asA = [["Months", "Assessments"]]
            let resA = d.message
            MONTHS.map((m, i)=>{
                let mn = m.slice(0, 3)
                let foundO = resA.find(r=>r._id ===(i+1))
                if(foundO !== undefined){
                  asA.push([mn, foundO.numAssessments])
                }else{
                  asA.push([mn, 0])
                }
            })
            setDataA(asA)

        }
      })
  }
  function getHeadCountsOverview(){
    axios.post(API_ENDPOINT+'trainer/headcounts-overview',{year: hOcurrentYear}, getHeader()).then(res=>{
      let d = res.data
      if(d.success){
          let asA = [["Months", "Candidates"]]
          let resA = d.message
          MONTHS.map((m, i)=>{
              let mn = m.slice(0, 3)
              let foundO = resA.find(r=>r._id ===(i+1))
              if(foundO !== undefined){
                asA.push([mn, foundO.count])
              }else{
                asA.push([mn, 0])
              }
          })
          setDataH(asA)

      }
    })
}
  const seeAll = ()=>{
      document.location.href = "/trainer/my-assessments"
  }
    return(
       <div>
          <div style={{fontSize: 24, fontFamily: 'Nunito, sans-serif', fontWeight: 500, color: '#3208FF'}}>Hello {getName().trim().split(' ')[0]}</div>
          <div style={{display: 'flex', width: '100%'}}>
            <div style={{flex: 1, fontSize: 16, color: '#6C7383'}}>Today's Assessment</div>
            <div onClick={seeAll} style={{marginRight: 40, fontWeight: 500, color: '#3208FF', cursor: 'pointer'}}>See all</div>
          </div>
          <div style={{marginRight: 38}}>
             {todaysAssessmentLoaded?
              (cCard != ""?<AssessmentCard name={cCard.title} num={cCard.numQns} duration={cCard.duration} code={cCard.code} linkCode={cCard.linkCode} show={true}/>:
                <div style={{display: 'flex', padding: 12, borderRadius: 8, color: '#ccc', fontWeight: 600, fontSize: 17, justifyContent: 'center'}}>No Assessments for Today</div>
              ):
              <ShimmerTable row={1} col={5} />
             }  
          </div>
        <div style={{display: 'flex', width: '100%', marginTop: 30}}>
          <div style={{flex: 0.50,paddingRight: 14}}>
            <img src={bannerImg} alt="banner" style={{width: '100%', height: '280px', borderRadius: 16}}/>
          </div>
        <div style={{flex: 0.50, display: 'flex', flexDirection: 'column', marginRight: 38, marginLeft: 16}}>
          <div style={{display: 'flex'}}>
          <div style={{flex: 1}}><InfoCard bgColor="#7da0fa" title="Plan Summary" value={planData? `${planData.used}/${planData.count}`: "..."} subvalue="Trial Plan - 14 days left"/> </div>
          <div style={{flex: 1, marginLeft: 24}}><InfoCard bgColor="#4747a1" title="Total Assessments" value={numAssessments} subvalue="4% since last month"/> </div>
          </div>
          <div style={{flex: 1}}></div>
          <div style={{display: 'flex'}}>
          <div style={{flex: 1}}><InfoCard bgColor="#7978e9" title="Total Questions" value={numQuestions} subvalue="20% since last month"/> </div>
          <div style={{flex: 1, marginLeft: 24}}><InfoCard bgColor="#f3797e" title="Total Topics" value={numTopics} subvalue="20% since last month"/> </div>
          </div>
         
        </div>
        </div>  
        <div style={{marginTop: '24px', paddingBottom: '16px'}}>
          <div style={{display: 'inline-block', paddingRight: 30, width: '50%', position: 'relative'}}>
          <select value={aOcurrentYear} onChange={e=>setAoCurrentYear(e.target.value)} style={{position: 'absolute', zIndex: 10, right: 30}}>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
                {dataA.length>0 &&
                  <Chart
                  chartType="Bar"
                  width="100%"
                  height="400px"
                  data={dataA}
                  options={assessmentOverviewOptions}
                />
                }
        </div>
        <div style={{display: 'inline-block', paddingRight: 36, width: '50%', position: 'relative'}}>
        <select value={hOcurrentYear} onChange={e=>setHoCurrentYear(e.target.value)} style={{position: 'absolute', zIndex: 10, right: 35}}>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
            { dataH.length>0 &&
              <Chart
                chartType="Bar"
                width="100%"
                height="400px"
                data={dataH}
                options={headCountsOverviewOptions}
              />
            }
        </div>
        </div>     
    </div>
    )
}
export default Dashboard