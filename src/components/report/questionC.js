import './questionC.css'
import parse from 'html-react-parser'
import { cleanO } from '../../utilities/utility'
import QsFigure from './qsFigure'
const QuestionC = (props)=>{
    const {q, qs, qnum, showAns=false} = props
    let qi = qs.findIndex(qq=>qq._id === q.question_id)
    let totalUsers=0, totalCorrect=0
    let cA=0;
    let cW=0
    if(qi !== -1){
        totalUsers = qs[qi].count
        totalCorrect = qs[qi].totalCorrect
        cA = Math.round(totalCorrect/totalUsers*100)
        cW = Math.round((1-totalCorrect/totalUsers)*100)
    }

    return(
        <div className='report-q-summary'>
           <QsFigure cA={cA} wA={cW}/>
            <div className='v_qn_q'><span className='qnum_c'>Q{qnum}</span> {parse(cleanO(q.question))}</div>
                <div style={{display: showAns?'initial':'none'}}>
                <div className='v_option'>
                    <div className={q.options[0].isCorrect?'answer':''}>A) {parse(cleanO(q.options[0].option))}</div>
                    <div className={q.options[1].isCorrect?'answer':''}>B) {parse(cleanO(q.options[1].option))}</div>
                </div>
                <div className='v_option'>
                    {q.options.length>2 && <div className={q.options[2].isCorrect?'answer':''}>C) {parse(cleanO(q.options[2].option))}</div>}
                    {q.options.length>3 && <div className={q.options[3].isCorrect?'answer':''}>D) {parse(cleanO(q.options[3].option))}</div>}
                </div>
                <div className='v_option'>
                     {q.options.length>4 && <div className={q.options[4].isCorrect?'answer':''}>E) {parse(cleanO(q.options[4].option))}</div>}
                    {q.options.length>5 && <div className={q.options[5].isCorrect?'answer':''}>F) {parse(cleanO(q.options[5].option))}</div>}
                </div>
                <div style={{marginTop: 12, fontStyle:'italic'}}>Topic: {q.topic}</div>
                </div>
        </div>
    )
}
export default QuestionC