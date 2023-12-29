import { useEffect, useRef } from "react"
import '../widgets/ratulModal/rdModal.css'
const UserModal = (props)=>{
    const {names, showModal, setShowModal} = props
    useEffect(()=>{
        if(showModal){
            modal.current.style.display = 'flex'
            modal.current.style.justifyContent = 'center'
            modal.current.style.animation = "showa 0.6s both"
        }
    }, [showModal])
    const modal = useRef(null)
    window.onclick = e=>{
        if(modal && e.target === modal.current)
            hideModal()
    }
    const animEnd = ()=>{
        if(window.getComputedStyle(modal.current).getPropertyValue("opacity") == 0){
            modal.current.style.display = "none"
        }
    }
    function hideModal(){
        modal.current.style.animation = "hidea 0.6s both"
        setShowModal(false)
    }
    const close = ()=>{
        hideModal()
    }
    return(
        <div ref={modal} onAnimationEnd={animEnd}  className="modal">
        <div onclick="event.stopPropagation()" className="modal-content">
            <div className="modal-header">
            <span onClick={close} className="close">&times;</span>
            </div>

            <div style={{padding: '0 16px 16px 16px'}}>
               {names.map(n=>(
                   <span style={{margin: 8, padding: '4px 12px', borderRadius: 8, border: '1px solid #ccc'}}>{n.name}</span>
               ))}
               {
                   names.length==0?'No candidates yet':''
               }
            </div>
            </div>

        </div>
    )
}
export default UserModal