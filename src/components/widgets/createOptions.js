import IconLabel from "./iconLabel"
import './createOptions.css'
const CreateOptions = (props)=>{
    const {title, icon, active, desc, onClick} = props
    return (
        <div onClick={onClick} className="create-options" style={{background: active?'#7978E9':'white'}}>
           <div className="create-options-h">
            <img style={{width: 32}} src={icon} alt=""/>
            <div className="create-options-h-l" style={{color: active?'white':'initial'}}>{title}</div>
            </div>
            <div className="create-options-h-b" style={{color: active?'white':'initial'}}>
           {desc}
            </div>
            <div style={{padding: 6, position: 'absolute', bottom: '6px', background: '#f0efef', display: 'block', color: '#3208FF', left: 0, right: 0,  marginLeft: 'auto', marginRight: 'auto',  fontSize: 11, fontWeight: 'bold', width: 120,   borderRadius: 6, textAlign: 'center', cursor: 'pointer'}}>Select</div>
        </div>
    )
}
export default CreateOptions