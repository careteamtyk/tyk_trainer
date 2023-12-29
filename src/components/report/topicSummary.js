import './topicSummary.css'
import TSummaryWidget from './tSummaryWidget'
import { API_ENDPOINT, HEADER_TOKEN } from '../../constants/constants'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
const TopicSummary = (props)=>{
    const {linkCode, questions} = props
    const [qs, setQs] = useState([])
    useEffect(()=>{
        loadResponses()
    }, [])
    const getNumQ = (topic)=>{
        let num = questions.filter(q=>q.topic === topic)
        return num.length
    }
    function loadResponses(){
        axios.post(API_ENDPOINT+'trainer/option-response-topic-summary', {linkCode}, HEADER_TOKEN).then(res=>{
            let d = res.data
            if(d.success){
                setQs(d.message)
            }else{
                toast(d.message)
            }
        })
    }
    return(
        <div className="topic-summary">
              <div style={{color: '#999', fontSize: 15, margin: '4px 12px'}}>
                The figures on the right indicates x% students scored on the topic</div>
            {
                qs.length>0?(
                    qs.map(qa=>{
                        return  <TSummaryWidget topic={qa._id} qnum={getNumQ(qa._id)} pc={Math.round((qa.totalCorrect/qa.count)*100)} /> 
                    })
                ):<CircularProgress/>
            }
        </div>
    )
}
export default TopicSummary