import './STCatItem'
import receit from './receit.png'
const STSubcat = (props)=>{
    const {subcat, onSelect} = props

    return(
        <div onClick={()=>onSelect(subcat)} className="st-cat-item">
            <img src={receit} alt="icons" />
            {
                subcat
            }
        </div>
    )
}
export default STSubcat