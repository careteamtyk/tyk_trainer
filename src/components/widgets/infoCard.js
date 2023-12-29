import './infoCard.css'
const InfoCard = (props)=>{
    const {title, value, subvalue, bgColor} = props
    const cs = {
        background: bgColor
    }
    return(
        <div style={cs} className='info-card'>
            <div>{title}</div>
            <div style={{alignSelf: 'center', fontSize: 36, marginTop: 8}}>{value}</div>
            {/* <div style={{fontSize: 14, marginLeft: 4, alignSelf: 'center'}}>{subvalue}</div> */}
        </div>
    )
}
export default InfoCard