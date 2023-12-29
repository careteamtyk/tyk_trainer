import './questionBox.css'
import parse from 'html-react-parser';
import axios from 'axios'
import { API_ENDPOINT, HEADER_TOKEN } from '../../../../constants/constants'
import { cleanO, saveAnswers } from '../../../../utilities/utility';
import { toast } from 'react-toastify';
const QuestionOption = (props)=>{
    const IN_PROGRESS = "In progress"
    const {on, config, socket, currentQn, setCurrentQn, num, question, oc, setCh,  ma, setMa, name, linkCode} = props
    const optionsI = ["A", "B", "C", "D", "E", "F"]

    let isAnswered = question.status==='attempted'
   
    const onClick  = ()=>{
        if(!(config.showAnswer && isAnswered)){
            setCh(on)
            let findQ = ma.findIndex(m=>m.question_id === question.question_id)
            let obj = ma[findQ]
            obj.status = 'attempted'
            obj.response = on
            obj.choiceCorrect = isCorrect()
            let rl = [...ma]
            setMa(rl)

            let allCorrect = rl.filter(r=>r.choiceCorrect)
            let allAttempted = rl.filter(r=>r.status === 'attempted')
            let dto = {name: name, linkCode: linkCode, status: IN_PROGRESS, score: allCorrect.length, numAttempted: allAttempted.length}
            socket.emit('goLive', dto)
            
            saveAnswers({name: name, linkCode: linkCode, questions: ma})
            
            if(!config.allowBack && currentQn<num){
                
                setCurrentQn(currentQn+1)
            }
    
            saveResponse()
        }
    }
    const saveResponse = ()=>{
        let toSave = {linkCode: linkCode, name: name, topic: question.topic, question_id: question.question_id, choice: on, choiceCorrect: isCorrect()?1:0, optionId: oc.optionId}
        axios.post(API_ENDPOINT+'user/option-response', toSave).then(res=>{
            let d = res.data
            if(!d.success){
                toast.error("The assessment is already completed and your new submission is rejected")
            }
        })
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