import './answerOption.css'
import parse from 'html-react-parser';
const PreviewAnswerOption = (props)=>{
    const {isAnswer, on, oc, wrong} = props
    return(
        <div className='answer_option'>
        <div className='option_num'><div style={{alignSelf: 'center'}}>{on}</div></div>
        <div className='option_content'>{parse(oc)}</div>
        </div>
    )
}
export default PreviewAnswerOption