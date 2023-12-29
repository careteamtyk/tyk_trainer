import './planWidget.css'
import {Button} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { RUPEE_SYMBOL } from '../../constants/constants';
const PlanWidget = ({plan, selected, onProceed, onSelect})=>{
    const nameStyle = {
        backgroundColor: plan.color,
        color: 'white'
    }
    const countStyle={
        color: plan.color
    }
    const discountedPrice = plan.price * (1 + (plan.discount / 100));
    return (
        <div onClick={onSelect} className={selected?"plan-widget selected":"plan-widget"}>
            <div style={nameStyle} className='plan-name'>{plan.name}</div>
            <div style={{marginTop: 8, lineHeight: 0.98, color: '#777', fontSize:15, textAlign: 'center'}}>Create and manage assessments upto</div>
            <div style={{textAlign: 'center', marginTop: '8px'}}>
                <div style={countStyle} className='plan-number'>
                    {plan.count}
                </div>
                <div style={{color: '#777'}}>per month</div>
            </div>
            <div style={{marginTop: '8px', textAlign: 'center'}}>
            <span className='strike-through' style={{color: '#777' }}>{RUPEE_SYMBOL}{Math.round(discountedPrice)}</span>
            <span style={{ marginLeft: '8px', color: plan.color.bg, fontWeight: 500 }}>{RUPEE_SYMBOL}{plan.price}</span>
            </div>
            <div style={{marginLeft: 'auto', marginRight: 'auto', display: 'table', marginTop: '8px'}}><Button onClick={()=>onProceed(plan)} variant="outlined" endIcon={<ArrowForwardIcon/>}>Proceed</Button></div>
        </div>
    )
}   
export default PlanWidget