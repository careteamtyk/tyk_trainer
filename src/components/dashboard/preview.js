import IconLabel from "../widgets/iconLabel"
import clockIcon from '../../assets/svgs/clock.svg'
import topicIcon from '../../assets/images/topic_icon.png'
import questionIcon from '../../assets/images/question_paper_icon.png'
import QuestionsList from "./optionmodes/questionsList"
import SelectedTopic from "../widgets/selectedTopic"
import RdModal from "../widgets/ratulModal/rdModal"
import { useState } from "react"
import { Button } from "@mui/material"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import './preview.css'
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SimpleAddQuestion from "../widgets/ratulModal/simpleAddQuestion"
const Preview = (props)=>{
    const {questions, setQuestions, banner, at, ad, setS} = props
    const [showModal, setShowModal] = useState(false)
    let uniqueObjArray = [
        ...new Map(questions.map((item) => [item["topic"], item])).values()
    ]
    
    let result = questions.reduce(function(acc, curr) {
        // Check if there exist an object in empty array whose CategoryId matches
        let isElemExist = acc.findIndex(function(item) {
          return item.topic === curr.topic;
        })
        if (isElemExist === -1) {
          let obj = {};
          obj.topic = curr.topic;
          obj.count = 1;
          acc.push(obj)
        } else {
          acc[isElemExist].count += 1
        }
        return acc;
      }, [])
    const goNext = ()=>{
        setS("Step 4")
    }
    const goPrev = ()=>{
      setS("Step 2")
    }
    const onQnAdded = (qn)=>{
        let qns = [...questions]
        qns.unshift(qn)
        setQuestions(qns)
    }
    return(
        <div className="assessment-preview">
          <SimpleAddQuestion onQnAdded={onQnAdded} showModal={showModal} setShowModal={setShowModal}/>
            <div style={{display: 'flex'}}>
                <div style={{flex: 0.4, position: 'relative', height: '70vh'}}>

                <div style={{marginLeft: 10, marginRight: 10, marginTop: '8px'}}>
                    <div style={{display: 'flex'}}>
                      <img src={banner} style={{borderRadius: '50%', width: '144px',height: '144px', objectFit: 'cover'}} alt=""/>
                      <div style={{marginLeft: '16px'}}>
                      <div style={{fontWeight: 600, fontSize: 18}}>{at}</div>
                      <IconLabel icon={clockIcon} isMUI={false} label={`${ad} minutes`} is={16} ls={14} gap={10} />
                      <IconLabel icon={topicIcon} isMUI={false} label={`${result.length} Topics Added`} is={16} ls={14} gap={10} />
                      <IconLabel icon={questionIcon} isMUI={false} label={`${questions.length} Questions Added`} is={16} ls={14} gap={10} />
                      </div>
                    </div>
                <div style={{marginTop: '12px'}}>
                  {
                    result.map(r=>(
                      <SelectedTopic isPreview={true} topic={r.topic} num={r.count}/>
                    ))
                  }
                  <div className="p-add-m-q">
                  <Button onClick={()=>setShowModal(true)}  startIcon={<AddCircleOutlineIcon sx={{fontSize: '28px'}}/>} variant='contained'>Add More Question</Button>
                  </div>
                </div>
                </div>
                <div className="p-nav">
                  <Button onClick={goPrev} variant="contained" startIcon={<ArrowBackIosNewIcon />}>Previous</Button>
                  <div style={{marginLeft: 16}}><Button onClick={goNext} variant="contained" endIcon={<ArrowForwardIosIcon />}>Next</Button></div>
                </div>
                </div>
                <div style={{flex: 0.6}}>
                    <QuestionsList questions={questions} setQuestions={setQuestions}/>
                </div>
            </div>
        </div>
    )
}
export default Preview