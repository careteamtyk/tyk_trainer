import './STCatItem.css'
import receit from './receit.png'
const STCatItem = (props)=>{
    const {cat, onSelect} = props
    return(
        <div onClick={()=>onSelect(cat.category)} className="st-cat-item">
             <img src={receit} alt="icons" />
             <div>{cat.category}</div>
        </div>
    )
}
export default STCatItem