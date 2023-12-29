import './widget.css'
const RatulButton = (props)=>{
    const {onClick, text} = props
    return(
        <div onClick = {onClick} className="ratul_button">
            {text}
        </div>
    )
}
export default RatulButton