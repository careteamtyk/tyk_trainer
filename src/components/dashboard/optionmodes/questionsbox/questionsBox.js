import './questionsbox.css'
import topicIcon from '../../../../assets/images/topic_icon.png'
import IconLabel from '../../../widgets/iconLabel'
import { FormControlLabel, IconButton, InputBase, Paper, Switch } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import SelectQuestionBox from './selectQuestionBox';
const QuestionsBox = (props)=>{
  const {ct, questions, setQuestions, topicsQns} = props
  const [showAnswer, setShowAnswer] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const FilterQns = topicsQns.filter(f=>new RegExp(searchQuery, 'i').test(f.question))
    return(
        <div className="questions_box">
            <div className="qb_header">
                <div>Selected Topic</div>
                <div style={{display: 'flex'}}>
                <IconLabel icon={topicIcon} isMUI={false} label={ct.num === 0?"...":ct.topic} is={15} ls={17} gap={8}  />  
                <div style={{alignSelf: 'center', marginLeft: 20, color: '#666', fontSize: 14}}>{ct.num} Questions</div>
                <div style={{flex: 1, display: 'flex', justifyContent: 'end'}}>
                <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 280 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Question"
              onChange={(e)=>setSearchQuery(e.target.value)}
              inputProps={{ 'aria-label': 'Search Question' }}
            />
            <IconButton type="submit" sx={{ p: '8px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
                </div>
                </div>
                <FormControlLabel control={<Switch checked={showAnswer} onChange={()=>setShowAnswer(!showAnswer)}  size="small"/>} labelPlacement="start" label="Show Answers" />
            </div>
            <div className="qb_content">


              {
              !(FilterQns.length>0)?
                topicsQns.map((q)=><SelectQuestionBox q={q} showAns={showAnswer} questions={questions} setQuestions={setQuestions}/>)
              
              : FilterQns.map((q)=><SelectQuestionBox q={q} showAns={showAnswer} questions={questions} setQuestions={setQuestions}/>)
              }
            </div>
        </div>
    )
}
export default QuestionsBox