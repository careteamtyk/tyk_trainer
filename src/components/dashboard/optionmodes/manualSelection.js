import './modes.css'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TopicBox from '../../widgets/topicBox';
import BiotechIcon from '@mui/icons-material/Biotech';
import { Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import clockIcon from '../../../assets/svgs/clock.svg'
import topicIcon from '../../../assets/images/topic_icon.png'
import questionIcon from '../../../assets/images/question_paper_icon.png'
import IconLabel from '../../widgets/iconLabel'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import aiDemo from '../../../assets/images/ai_demo.jpg'
import Tkheader from '../../widgets/tkHeader';
import { useState, useEffect} from 'react';
import SelectedTopic from '../../widgets/selectedTopic';
import {toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';

import RdModal from '../../widgets/ratulModal/rdModal';
import QuestionsBox from './questionsbox/questionsBox';
import axios from 'axios';
import { API_ENDPOINT, HEADER_TOKEN } from '../../../constants/constants';
const ManualSelection = (props)=>{
  const {at, ad, banner, questions, setQuestions, setS} = props
  const [topicsQns, setTopicsQns] = useState([])
  const [tps, setTps] = useState([])
  const [st, setSt] = useState("")
  const [ct, setCt] = useState({topic: 'Select Topic', num: 0})
  const [topics, setTopics] = useState([])

  

  let mytopics = questions.reduce(function(acc, curr) {
    let isElemExist = acc.findIndex(function(item) {
      return item.topic === curr.topic;
    })
    if (isElemExist === -1) {
      let obj = {};
      obj.topic = curr.topic;
      obj.num = 1;
      acc.push(obj)
    } else {
      acc[isElemExist].num += 1
    }
    return acc;
  }, [])
  const onTopicSelect = (s)=>{
    setSt(s)
    let tp = topics.find(t=>t.topic===s)
    setCt(tp) 
    loadTopicsQuestions(tp.topic)
  }
  useEffect(()=>{
    loadTopicNum()
  }, [])
  const loadTopicsQuestions = (tp)=>{
      axios.post(API_ENDPOINT+'trainer/topics-questions', {topic: tp}, HEADER_TOKEN).then(res=>{
        let d = res.data
        if(d.success){
            let das = d.message
            das.forEach(d=>{
                d.question_id = d._id
                d.options.map((o, i)=>{
                  o.optionId = uuid()
                })
            })
            setTopicsQns(das)
        }
      })
  }
  // const loadTopics = ()=>{
  //   axios.post(API_ENDPOINT+'trainer/get-topics-active', {}, HEADER_TOKEN).then(res=>{
  //       let d = res.data
  //       if(d.success){
  //         let da = []
  //         let ds = d.message
  //         ds.map(d=>{
  //             da.push({topic: d.topic, num: 0})
  //         })
  //         setTopics(da)
  //         loadTopicNum()
  //       }else{
  //         toast(d.message)
  //       }
  //   })
  // }
  function loadTopicNum(){
    axios.post(API_ENDPOINT+'trainer/get-topics-all-num', {}, HEADER_TOKEN).then(res=>{
        let d = res.data
        if(d.success){
            let numsa = d.message
            let tps = []
            numsa.map((nm, i)=>{
              tps.push({topic: nm._id, num: nm.count})
            })
            setTopics(tps)
        }
    })
  }
  const onAdd = ()=>{ 
    
  }
  const onRemove = (topic)=>{
      const ta = [...questions]
      let tpa = ta.filter(tf=>tf.topic === topic)
      tpa.map(q=>{
        let qIndex = ta.findIndex(tt=>tt.question_id === q.question_id)
        ta.splice(qIndex, 1)
      })
      setQuestions(ta)
  }
  const goNext = ()=>{
    setS("Step 3")
  }
  const goPrev = ()=>{
    setS("Step 1")
  }
    return(
        <div className="random_selection">
    <div style={{display: 'flex', width: '100%', marginTop: 12}}>
        <div style={{flex: 0.4, width: '100%', padding: 8}}>
        <div style={{marginLeft: 14}}>
        <Tkheader title="Topics"/>
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search any Topics"
              inputProps={{ 'aria-label': 'Search any Topics' }}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <div style={{marginTop: 16}}>
          {
            topics.map(t=>(
              <TopicBox onClick={()=>onTopicSelect(t.topic)} topic={t.topic} num={t.num}  selected={t.topic === st}/>
            ))
          }
        </div>
        </div>
        <div style={{flex: 0.6, marginLeft: 16, paddingTop: 16}}>
            <QuestionsBox ct={ct} questions = {questions} setQuestions = {setQuestions} topicsQns={topicsQns}/>
        </div>
    </div>
    <div style={{display: 'flex',  margin: 'auto', justifyContent: 'center', marginTop: 48}}>
    <Button onClick={goPrev} variant="contained" startIcon={<ArrowBackIosNewIcon />}>Previous</Button>
    <div style={{marginLeft: 16}}><Button onClick={goNext} variant="contained" endIcon={<ArrowForwardIosIcon />}>Next</Button></div>
    </div>

    <div style={{display: 'flex', marginTop: 16, borderTopLeftRadius: 8, borderTopRightRadius: 8, borderTop: '4px solid #3208FF', padding: 10, boxShadow: ' 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)'}}>
    <img src={banner} style={{borderRadius: 10, maxHeight: '144px', objectFit: 'cover'}} alt=""/>
            <div style={{marginLeft: 16, marginRight: 16}}>
               <div style={{fontWeight: 600, fontSize: 16}}>{at}</div>
               <IconLabel icon={clockIcon} isMUI={false} label={`${ad} minutes`} is={16} ls={14} gap={10} />
               <IconLabel icon={topicIcon} isMUI={false} label={`${mytopics.length} Topics Added`} is={16} ls={14} gap={10} />
               <IconLabel icon={questionIcon} isMUI={false} label={`${questions.length} Questions Added`} is={16} ls={14} gap={10} />
            </div>
        <div style={{flex: 1, paddingLeft: 16, paddingRight: 16}}>
          <div style={{fontWeight: 600, fontSize: 16}}>Selected Topics</div>
          {
            !(mytopics.length>0)?'No Topic selected yet':(
              mytopics.map(t=>(
                <SelectedTopic  onRemove={()=>onRemove(t.topic)} topic={t.topic} num={t.num} /> 
              ))
            )
          }

        </div>
    </div>
        </div>
    )
}
export default ManualSelection