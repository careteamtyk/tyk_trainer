import { FormControlLabel, IconButton, InputBase, Paper, Switch } from "@mui/material"
import { useEffect, useState } from "react"
import SearchIcon from '@mui/icons-material/Search';
import './qlQuestions.css'
import QlQuestionBox from "./qlQuestionBox";
import EmptyContent from "../../widgets/emptyContent";
import AlertDialogSlide from "../../widgets/ratulModal/alertDialog";
import CustomCircularP from "../../widgets/customCircularP";
const QlQuestions = (props)=>{
    const {onQnDeleted, isQL, questions, setQuestions} = props

    console.log(questions)
    const [myqns, setMyqns] = useState([])
    const [showSearch, setShowSearch] = useState(false)
    const [showAns, setShowAns] = useState(false)
    const [cq, setCq] = useState({})
    const [dopen, setDopen] = useState(false)
    const onChange = ()=>{
        setShowAns(!showAns)
    }
    const onSearch = (e)=>{
       let s = e.target.value
       if(s.length>0){
            setShowSearch(true)
            let ss = [...questions]  
            let sf = ss.filter(f=>new RegExp(s, 'i').test(f.question))
            setMyqns(sf)
       }else{
           setShowSearch(false)
           setMyqns(questions)
       }
    }
    const onDelete = (qn)=>{
        setCq(qn)
        setDopen(!dopen)
    }
    return(
        <div className="ql-questions-c">
           {<CustomCircularP show={isQL} />}
             {!!cq?<AlertDialogSlide onQnDeleted={onQnDeleted} isQl={true} dopen = {dopen} q={cq} setDopen= {setDopen} myqns={myqns} setMyqns={setMyqns} questions = {questions} setQuestions={setQuestions}/>:''}
           <div className="ql-questions-h">
                <div style={{flex: 1}}>
                <div className="ql-questions-hl">{questions.length>0?`${questions.length} Questions`:'Questions'}</div>
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
                    sx={{ p: '0 2px', borderRadius: 22, display: 'flex', alignItems: 'center', width: '100%' }}
                    >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Question"
                        onChange={onSearch}
                        inputProps={{ 'aria-label': 'Search Question' }}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                </div>    
            </div>
                    <div className="ql-questions">
                        {
                        !showSearch?                   
                        questions.length>0?
                        questions.map((q, i)=>(
                           <QlQuestionBox i={i} onDelete={()=>onDelete(q)} questions={questions} setQuestions={setQuestions} q={q} showAns={showAns} />
                        )):<EmptyContent lv="No Questions yet"/>
                        :
                        <div>
                            {myqns.map((q, i)=>(
                                <QlQuestionBox i={i} onDelete={()=>onDelete(q)} questions={questions} setQuestions={setQuestions} q={q} showAns={showAns} />
                             ))
                            }
                        </div>
                        }    
                    </div>
        </div>
    )
}
export default QlQuestions