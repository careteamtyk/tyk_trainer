import './questionsbox.css'
import parse from 'html-react-parser';
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react';
import { cleanO } from '../../../../utilities/utility';
const SelectQuestionBox = (props)=>{
    const {q, qnum, showAns, questions, setQuestions} = props
    let qnIndex = questions.findIndex(qn=>qn.question_id === q.question_id)
    let selected = qnIndex === -1?false:true 
    const onSelect = ()=>{
        const ta = [...questions]
        let qIndex = ta.findIndex(tt=>tt.question_id === q.question_id)
        if(qIndex === -1){
            ta.push(q)
            setQuestions(ta)
        }else{
            ta.splice(qIndex, 1)
            setQuestions(ta)
        }
    }
    console.log(q.options.length)
    return(
        <div onClick={onSelect} className={ selected? 'view_question selected':'view_question'}>
            <div className='v_qn_q'><span>Question</span> {parse(cleanO(q.question))}</div>
            <div style={{display: showAns?'initial':'none'}}>
                <div className='v_option'>
                    <div style={{color: q.options[0].isCorrect?'green':'initial'}}>A) {parse(cleanO(q.options[0].option))}</div>
                    <div style={{color: q.options[1].isCorrect?'green':'initial'}}>B) {parse(cleanO(q.options[1].option))}</div>
                </div>
                <div className='v_option'>
                {q.options.length>2 &&  <div style={{color: q.options[2].isCorrect?'green':'initial'}}>C) {parse(cleanO(q.options[2].option))}</div>}
                    {q.options.length>3 && <div style={{color: q.options[3].isCorrect?'green':'initial'}}>D) {parse(cleanO(q.options[3].option))}</div>}
                </div>
                <div className='v_option'>
                    {q.options.length>4 && <div style={{color: q.options[4].isCorrect?'green':'initial'}}>E) {parse(cleanO(q.options[4].option))}</div>}  
                    {q.options.length>5 && <div style={{color: q.options[5].isCorrect?'green':'initial'}}>F) {parse(cleanO(q.options[5].option))}</div>}
                </div>
                {/* {showAns?<><div style={{borderRadius: 12, padding: '2px 10px', border: '1px solid #ccc', display: 'table', color: 'green', marginTop: 16}}>Ans: {q.Ans}</div></>:''} */}
                <div style={{marginTop: 12, fontStyle:'italic'}}>Topic: {q.topic}</div>
                </div>
        </div>
    )
}
export default SelectQuestionBox