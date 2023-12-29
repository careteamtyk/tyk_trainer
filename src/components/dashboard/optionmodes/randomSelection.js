import './modes.css'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TopicBox from '../../widgets/topicBox';
import BiotechIcon from '@mui/icons-material/Biotech';
import { Button, CircularProgress, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import clockIcon from '../../../assets/svgs/clock.svg'
import topicIcon from '../../../assets/images/topic_icon.png'
import questionIcon from '../../../assets/images/question_paper_icon.png'
import IconLabel from '../../widgets/iconLabel'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import aiDemo from '../../../assets/images/ai_demo.jpg'
import { v4 as uuid } from 'uuid';
import Tkheader from '../../widgets/tkHeader';
import { useEffect, useState } from 'react';
import SelectedTopic from '../../widgets/selectedTopic';
import {toast } from 'react-toastify';

import axios from 'axios';
import { API_ENDPOINT, HEADER_TOKEN } from '../../../constants/constants';
import AlertDialogSlide from '../../widgets/ratulModal/alertDialog';
import { saveDraft } from '../../../utilities/utility';
const RandomSelection = (props)=>{
  const {assessment, at, ad, banner, questions, setQuestions, setS} = props

  let mytopics = questions.reduce(function(acc, curr) {
    // Check if there exist an object in empty array whose CategoryId matches
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

  const [topics, setTopics] = useState([])
  const [st, setSt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [ct, setCt] = useState({topic: "Select Topic", num: 0})
  const [qno, setQno] = useState("")
  const onTopicSelect = (s)=>{
    setSt(s)
    let tp = topics.find(t=>t.topic===s)
    setCt(tp)
  }
  function isReallyNumber(data) {
    let regex=/^[0-9]+$/
    return !!data.match(regex)
  }
  const onAdd = ()=>{ 
    if(isReallyNumber(qno) && qno>0){
      if(ct.num > 0){
        if(qno>ct.num){
          toast(`Number cannot exceed ${ct.num}`)
        }else{
          let tp = mytopics.find(t=>t.topic===ct.topic)
          if(tp){
            toast("Already added")  
          }else{
            axios.post(API_ENDPOINT+'trainer/topics-questions-random', {topic: ct.topic, num: qno}, HEADER_TOKEN).then(res=>{
                let d = res.data
                if(d.success){
                  let na = d.message
                  let ea = [...questions]
                  na.map(e=>{
                      e.question_id = uuid()
                      e.options.map((o, i)=>{
                        o.optionId = uuid()
                      })
                  })
                  setQuestions(ea.concat(na))
                  saveToDraft()
                  setQno("")
                  toast(`${qno} Questions Added`)  
                }
            })
          }
        }
      }else{
          toast("Nothing to add from this Topic")
      } 
    }else{
        toast("Please Enter valid number")
    }
  }
  function saveToDraft(){
     assessment.questions = questions
      saveDraft(assessment)
  }
  const onRemove = (tp)=>{
    let qns = [...questions]
    qns.filterpop(q=>q.topic === tp)
    setQuestions(qns)
    saveToDraft()
  }
  useEffect(()=>{
    loadTopicNum()
  }, [])
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

  Array.prototype.filterpop = function (fn) {
    let filteredValues = [];
    for (let i = this.length - 1; i >= 0; i--) {
        if (fn(this[i])) {
            filteredValues.push(this.splice(i, 1)[0]);
        }
    }
    return filteredValues;
  } 
  const goNext = ()=>{
    setS("Step 3")
  }
  const goPrev = ()=>{
    setS("Step 1")
  }
    return(
        <div className="random_selection">
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

    <div style={{display: 'flex', width: '100%', marginTop: 12}}>
        <div style={{maxWidth: 500, width: '100%', padding: 8}}>
          {
            topics.map(t=>(
              <TopicBox onClick={()=>onTopicSelect(t.topic)} topic={t.topic} num={t.num} selected={t.topic === st}/>
            ))
          }
        </div>
        <div style={{flex: 1, marginLeft: 16}}>
            <div style={{maxWidth: 450, padding: 16, borderRadius: 12, width: '100%', boxShadow: 'rgb(0 0 0 / 16%) 0px 3px 6px, rgb(152 167 235 / 23%) 0px 3px 6px'}}>
            <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: isLoading?'table':'none'}}><CircularProgress /></div>
            <p>Selected Topics</p>
            <div style={{display: 'flex', color: '#555'}}>
            <BiotechIcon />
            <div style={{fontWeight: 500, fontSize: 16, alignSelf: 'center', marginLeft: 8}}>{ct.topic}</div>
            <div style={{marginLeft: 12, color: '#888', alignSelf: 'center', fontSize: 15}}>{ct.num} Questions</div>
            </div>
            <div style={{fontWeight: 500, marginTop: 16}}>Select no of Questions</div>
            <div style={{fontSize: 13, color: '#888'}}>System will randomly pick from question bank</div>
            <div style={{display: 'flex', marginTop: 16}}>
            <div style={{alignSelf: 'center'}}><TextField onChange={(e)=>setQno(e.target.value)} value={qno} label="No. of Questions" size='small'/></div><div style={{marginLeft: 16, alignSelf: 'center'}}><Button onClick={onAdd} startIcon={<AddIcon />} variant='contained'>Add</Button></div>
            </div>
            </div>
        </div>
    </div>
    <div style={{display: 'flex',  margin: 'auto', justifyContent: 'center', marginTop: 32}}>
    <Button onClick={goPrev} variant="contained" startIcon={<ArrowBackIosNewIcon />}>Previous</Button>
    <div style={{marginLeft: 16}}><Button onClick={goNext} variant="contained" endIcon={<ArrowForwardIosIcon />}>Next</Button></div>
    </div>

    <div style={{display: 'flex', marginTop: 16, borderTopLeftRadius: 8, borderTopRightRadius: 8, borderTop: '4px solid #3208FF', padding: 4, boxShadow: ' 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)'}}>
    <img src={banner} style={{borderRadius: 10, maxHeight: '144px', objectFit: 'cover'}} alt=""/>
            <div style={{marginLeft: 16, marginRight: 16}}>
               <div style={{fontWeight: 600, fontSize: 16}}>{at}</div>
               <IconLabel icon={clockIcon} isMUI={false} label={ad+" minutes"} is={16} ls={14} gap={10} />
               <IconLabel icon={topicIcon} isMUI={false} label={`${mytopics.length} Topics Added`} is={16} ls={14} gap={10} />
               <IconLabel icon={questionIcon} isMUI={false} label={`${questions.length} Questions Added`} is={16} ls={14} gap={10} />
            </div>
        <div style={{flex: 1, paddingLeft: 32, paddingRight: 16}}>
          <div style={{fontWeight: 600, fontSize: 16}}>Selected Topics</div>
          {
            !(mytopics.length>0)?'No Topic selected yet':(
              mytopics.map(t=><SelectedTopic  onRemove={()=>onRemove(t.topic)} topic={t.topic} num={t.num} /> )
            )
          }

        </div>
    </div>
        </div>
    )
}
export default RandomSelection