import './questionBox.css'
import parse from 'html-react-parser';
import axios from 'axios'
import { API_ENDPOINT, HEADER_TOKEN } from '../../../../constants/constants'
import { cleanO, saveAnswers } from '../../../../utilities/utility';
const QuestionOption = (props)=>{
    const {on, config, currentQn, setCurrentQn, num, question, oc, setCh,  ma, setMa} = props
    const optionsI = ["A", "B", "C", "D", "E", "F"]

    let isAnswered = question.status==='attempted'
   
    const onClick  = ()=>{
        if(!(config.showAnswer && isAnswered)){
            setCh(on)
            let findQnIndex = ma.findIndex(m=>m._id === question._id)
            let obj = ma[findQnIndex]
            obj.status = 'attempted'
            obj.response = on
            obj.choiceCorrect = isCorrect()
            let rl = [...ma]
            setMa(rl)

            // let allCorrect = rl.filter(r=>r.choiceCorrect)
            // let allAttempted = rl.filter(r=>r.status === 'attempted')
            // let dto = {name: name, linkCode: linkCode, status: IN_PROGRESS, score: allCorrect.length, numAttempted: allAttempted.length}
            // console.log(dto)
            // socket.emit('goLive', dto)
            
            // saveAnswers({name: name, linkCode: linkCode, questions: ma})
            
            // if(!config.allowBack && currentQn<num){
            //     setCurrentQn(currentQn+1)
            // }
        }
    }
    function isCorrect(){
        let ind = question.options.findIndex(o=>o.isCorrect)
        return optionsI[ind] === on
    }
    return(<div className={isAnswered? config.showAnswer?(isCorrect()?`question_option answer`:(question.response===on?`question_option wrong`:`question_option`)):(question.response===on?`question_option answer`:`question_option`):`question_option`} onClick={onClick}>
        <div className='option_num'><div style={{alignSelf: 'center'}}>{on}</div></div>
        <div className='option_content'>{parse(cleanO(oc.option))}</div>
    </div>)
}
export default QuestionOption