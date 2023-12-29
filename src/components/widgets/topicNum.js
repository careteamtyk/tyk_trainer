import axios from 'axios'
import { useState } from 'react'
import { API_ENDPOINT, HEADER_TOKEN } from '../../constants/constants'
import './widget.css'
const TopicNum = (props)=>{
    const {topic, num, selected, setTopic, setQuestions} = props
    const onClick = ()=>{
        setTopic(topic)
        loadQuestions()
    }
    const loadQuestions = ()=>{
        axios.post(API_ENDPOINT+'trainer/topics-questions', {topic: topic}, HEADER_TOKEN).then(res=>{
            let d = res.data
            setQuestions(d.message)
        })
    }
    return (
        <div onClick={onClick} className={"topic_box"+(selected?" selected":"")}>
            {topic} {num?<span style={{marginLeft: 16}}>{num}</span>:''}
        </div>
    )
}
export default TopicNum