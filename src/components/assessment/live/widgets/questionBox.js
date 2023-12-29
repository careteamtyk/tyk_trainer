import './questionBox.css'
import QuestionOption from './questionOption'
import parse from 'html-react-parser';
import { useState } from 'react';
import { cleanO } from '../../../../utilities/utility';
const QuestionBox = (props)=>{
    const [ch, setCh] = useState('')
    const {question, socket, currentQn, setCurrentQn, num, config, qno, show, ma, setMa, name, linkCode} = props
    let options = question.options
    return(
        <div className='question_content' style={{display: show?'initial':'none'}}>
            <div className='question_num'>Question {qno}</div>
            <div className='question'>{parse(cleanO(question.question))}</div>
            <QuestionOption socket={socket} config={config} currentQn={currentQn} setCurrentQn={setCurrentQn} num={num} linkCode={linkCode} name={name} qno={qno} question={question} ma={ma} setMa={setMa} on = "A" oc={options[0]} setCh={setCh} isAnswer={ch==='A'}/>
            <QuestionOption socket={socket} config={config} currentQn={currentQn} setCurrentQn={setCurrentQn} num={num} linkCode={linkCode} name={name} qno={qno} question={question} ma={ma} setMa={setMa} on = "B" oc={options[1]} setCh={setCh} isAnswer={ch==='B'}/>
            {options.length>2?<QuestionOption socket={socket} config={config} currentQn={currentQn} setCurrentQn={setCurrentQn} num={num} linkCode={linkCode} name={name} qno={qno} question={question} ma={ma} setMa={setMa} on = "C" oc={options[2]} setCh={setCh} isAnswer={ch==='C'}/>:''}
            {options.length>3?<QuestionOption socket={socket} config={config} currentQn={currentQn} setCurrentQn={setCurrentQn} num={num} linkCode={linkCode} name={name} qno={qno} question={question} ma={ma} setMa={setMa} on = "D" oc={options[3]} setCh={setCh} isAnswer={ch==='D'}/>:''}
            {options.length>4?<QuestionOption socket={socket} config={config} currentQn={currentQn} setCurrentQn={setCurrentQn} num={num} linkCode={linkCode} name={name} qno={qno} question={question} ma={ma} setMa={setMa} on = "E" setCh={setCh} oc={options[4]} isAnswer={ch==='E'}/>:''}
            {options.length>5?<QuestionOption socket={socket} config={config} currentQn={currentQn} setCurrentQn={setCurrentQn} num={num} linkCode={linkCode} name={name} qno={qno} question={question} ma={ma} setMa={setMa} on = "F" setCh={setCh} oc={question.options[5]} isAnswer={ch==='F'}/>:''}
        </div>
    )
}
export default QuestionBox