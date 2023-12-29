import { FormControlLabel, IconButton, InputBase, Paper, Switch } from "@mui/material"
import { useEffect, useState } from "react"
import ViewQuestionBox from "./questionsbox/viewQuestionBox"
import SearchIcon from '@mui/icons-material/Search';
import './modes.css'
import EditModal from "../../widgets/ratulModal/editModal";
import { Filter, Quickreply } from "@mui/icons-material";
const QuestionsList = (props)=>{
    const {questions, setQuestions} = props
    const [searchQuery, setSearchQuery] = useState("")
    const [showAns, setShowAns] = useState(false)

    const FilterQns = questions.filter(f=>new RegExp(searchQuery, 'i').test(f.question))

    const onChange = ()=>{
        setShowAns(!showAns)
    }
    const onSearch = (e)=>{
       let s = e.target.value
       setSearchQuery(s)
    //    if(s.length>0){
    //         setShowSearch(true)
    //         let ss = [...questions]
    //         let sf = ss.filter(f=>new RegExp(s, 'i').test(f.question))
    //         setMyqns(sf)
    //    }else{
    //        setShowSearch(false)
    //    }
    }
    const onQnDeleted = (qid)=>{
        let qns = [...questions]
        let i = qns.findIndex(q=>q.question_id==qid)
        qns.splice(i, 1)
        setQuestions(qns)
    }
    const onEdited = (qn)=>{
        let qns = [...questions]
        let i = qns.findIndex(q=>q.question_id==qn.question_id)
        qns.splice(i, 1, qn)
        setQuestions(qns)
    }
    return(
        <div className={questions.length>0?"q_container content":"q_container"}>
           <div className="q_action-f">
            <div style={{flex: 1}}>
            <div style={{fontSize: 19, color: 'rgb(104 101 101)', fontWeight: 600, marginLeft: 15}}>Questions</div>
            <FormControlLabel
                    value="start"
                    control={<Switch size="small" color="primary" />}
                    label="Show Answer"
                    checked={showAns}
                    onChange = {onChange}
                    labelPlacement="start"
                  />
            </div>
            <div>
            <Paper
                component="form"
                sx={{ p: '0 4px', borderRadius: 22, display: 'flex', alignItems: 'center', width: '100%' }}
                >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Question"
                    onChange={onSearch}
                    inputProps={{ 'aria-label': 'Search Topic' }}
                />
                <IconButton type="submit" sx={{ p: '9px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>


            </div>
            
            </div>

                    {questions.length ===0?<div style={{textAlign: 'center', fontSize: 24, marginTop: 36, color: '#ccc'}}>Added Questions will be displayed here</div>:
                    
                    <div style={{overflowY: 'auto', maxHeight: '450px'}}>
                        {
                        !(FilterQns.length>0)?
                        questions.map((q, i)=>(
                            <ViewQuestionBox qnum={i+1} q={q} showAns={showAns} onQnDeleted={onQnDeleted} onEdited={onEdited}/>
                        )):
                        <div>
                            {FilterQns.map((q, i)=>(
                                <ViewQuestionBox qnum={i+1} q={q} showAns={showAns} onQnDeleted={onQnDeleted} onEdited={onEdited}/>
                             ))
                            }
                        </div>
                        }    
                    </div>}
        </div>
    )
}
export default QuestionsList