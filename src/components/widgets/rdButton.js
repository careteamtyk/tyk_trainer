import './rdButton.css'
const RdButton = (props)=>{
    return <button onMouseOver={props.onMouseOver} onMouseOut={props.onMouseOut} style={props.style} onClick={props.onClick} className="t_a_button">{props.value}</button>
}
export default RdButton