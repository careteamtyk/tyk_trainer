import './tabBtn.css'
const TabBtn = (props)=>{
    const {label, onClick, isSelected} = props
    return(
        <div onClick={onClick} className={isSelected?"r-tab-btn selected":"r-tab-btn"}>
            {label}
        </div>
    )
}
export default TabBtn