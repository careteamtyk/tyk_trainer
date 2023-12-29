import { FormControlLabel, Switch } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { API_ENDPOINT, HEADER_TOKEN } from '../../constants/constants'
import QuestionC from './questionC'
import { CircularProgress } from '@mui/material'
import './questionsSummary.css'
const QuestionsSummary = (props)=>{
    const [showAns, setShowAns] = useState(false)
    const {questions, linkCode} = props
    const [qs, setQs] = useState([])
    useEffect(()=>{
        loadResponses()
    }, [])
    function loadResponses(){
        axios.post(API_ENDPOINT+'trainer/option-response-q-summary', {linkCode}, HEADER_TOKEN).then(res=>{
            let d = res.data
            console.log(d) 
            if(d.success){
                setQs(d.message)
            }else{
                toast(d.message)
            }
        })
    }
    return(
        <div className='q-summary-c'>
            <div style={{color: '#999', fontSize: 15, margin: '4px 12px'}}>
                The figures on top right indicates: out of the number of users who attempted the question, x% got it right and y% got it wrong</div>
             <FormControlLabel
                        value="start"
                        control={<Switch size="small" color="primary" />}
                        label="Show Answer"
                        checked={showAns}
                        onChange = {()=>setShowAns(!showAns)}
                        labelPlacement="start"
                    />
                    {
                        qs.length>0?(
                            questions.map((q, i)=>{
                                return <QuestionC qnum={i+1} q={q} qs={qs} showAns={showAns}/>
                            })
                        ):<CircularProgress />
                    }
        </div>
    )
}
export default QuestionsSummary