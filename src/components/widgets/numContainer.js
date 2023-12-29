import './numContainer.css'
import AssignmentIcon from '@mui/icons-material/Assignment';
const NumContainer = (props)=>{
    const {lcolor="orange", icon, num=0, label=""} = props
    return (
        <div className="num-container">
            {icon}
            <div style={{alignSelf: 'center', marginLeft: '8px'}}>
                <div style={{lineHeight: 0.9, fontWeight: 600, color: lcolor, fontSize: 20}}>{num}</div>
                <div style={{color: '#777'}}>{label}</div>
            </div>
        </div>
    )
}
export default NumContainer