import './addTopic.css'
import DoneIcon from '@mui/icons-material/Done';
import { useState } from 'react';
import { NearbyError } from '@mui/icons-material';
const Topic = (props)=>{
    const {text, isSelectable=true, show, setShow, currentTopic, setCurrentTopic} = props
    const onSelect = ()=>{
        if(isSelectable){
            setCurrentTopic(text)
            setShow(!show)
        }
    }
    return (
        <div onClick={onSelect} className={text === currentTopic?'topic selected':'topic'}>
            <div>{text}</div> {text === currentTopic?<DoneIcon />:''}
        </div>
    )
}
export default Topic