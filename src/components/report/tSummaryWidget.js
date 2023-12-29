import { getColor } from '../../utilities/utility'
import './tSummaryWidget.css'
const TSummaryWidget = (props)=>{
    const {topic, qnum, pc, size="large"} = props
    return (
        <div className="t-summary-widget">
            <div className='t-summary-w-d-c'>
                <div style={{fontSize: size==="small"?'16px':'17px', color: getColor(pc)}} className='t-summary-w-d-h'>{topic}</div>
                <div style={{fontSize: size==="small"?'13px':'14px'}} className='t-summary-w-d-i'>{qnum} Questions</div>
            </div>
            <div style={{fontSize: size==="small"?'17px':'20px', color: getColor(pc)}} className='t-summary-w-p'>
                {`${pc}%`}
            </div>
        </div>
    )
}
export default TSummaryWidget