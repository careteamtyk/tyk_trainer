import { Button, IconButton } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './myModal.css'
import CloseButton from '../CloseButton';
const MyModal = ({showModal, showHeader=false, setShowModal, title="", modalC, mWidth})=>{
    useEffect(()=>{
        if(showModal){
            modal.current.style.display = 'flex'
            modal.current.style.justifyContent = 'center'
            modal.current.style.animation = "showa 0.6s both"
        }else{
            modal.current.style.animation = "hidea 0.6s both"
            setShowModal(false)
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
        <div  ref={modal} onAnimationEnd={animEnd}  className="rd-modal">
            <div style={{maxWidth: mWidth?mWidth:'1000px'}} onClick={event=>event.stopPropagation()} className="rd-modal-content">
                <div style={{position: 'absolute', right: '4px', top: '4px'}}><CloseButton onClose={close}/></div>
                <div className="modal-c-body">
                    {modalC}
                </div>
            </div>
        </div>
    )
}
export default MyModal