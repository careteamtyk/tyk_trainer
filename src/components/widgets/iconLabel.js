import './widget.css'
const IconLabel = (props)=>{
    const {icon, label, mg='0', is, ls='15px', gap='8px', color, wt, font, isMUI = true} = props 
        
    const containerStyle = {
        display: 'flex',
        marginTop: 10,
        marginLeft: mg,
        fontFamily: font?font:"Open Sans,Roboto,RobotoDraft,Helvetica,Arial,sans-serif",
        marginBottom: 10
    }
    const iconStyle = {
        width: is?is:'initial'
    }
    const labelStyle = {
        marginLeft: gap, 
        fontSize: ls,
        color: color?color:'initial',
        fontWeight: wt?wt:500, 
        alignSelf: 'center'
    }
    return (
        <div style={containerStyle}>
            {isMUI?icon:<img style={iconStyle} src={icon} alt=""/>}
            <div style={labelStyle}>{label}</div>
        </div>
    )
}
export default IconLabel