import './dataCard.css'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import summaryIcon from '../../assets/svgs/summary_icon.svg'
import summaryIcon2 from '../../assets/svgs/summary_icon2.svg'
const DataCard = (props)=>{
    const {title, value, subvalue, color} = props
    return(
        <div className='dash_data_card'>
            <div style={{fontWeight: 600, color: '#656a77', fontSize: 13}}>{title}</div>
            <div style={{display: 'flex', width: '100%'}}>
                <div style={{flex: 1, fontWeight: '500', color: color, alignSelf: 'center', fontSize: 22}}>{value}</div>
                <HistoryEduIcon sx={{color: color, fontSize: 40}}/>
            </div>
            <div style={{display: 'flex', width: '100%'}}>
                <img style={{width: 30}} src={summaryIcon} alt=""/>
                <div style={{flex: 1, fontSize: 11, marginLeft: 4, alignSelf: 'center', fontWeight: '500', color: '#656a77'}}>{subvalue}</div>
            </div>
        </div>
    )
}
export default DataCard