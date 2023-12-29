import { AddCircle } from '@mui/icons-material'
import { Button, IconButton, TextField } from '@mui/material'
import './addTopic.css'
import CloseIcon from '@mui/icons-material/Close';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react';
import axios from 'axios';
import Topic from './Topic'
import { API_ENDPOINT, HEADER_TOKEN } from '../../../constants/constants';
const AddTopic = (props)=>{
    const {show, setShow, topics, setTopics} = props
    const [tp, setTp] = useState("")
    const [mt, setMt] = useState([])
    const addTopic = ()=>{
        if(tp ===""){
            toast("Please Enter Topic", {position: 'bottom-center', autoClose: 1000})
        }else{
            axios.post(API_ENDPOINT+'trainer/add-topic', {topic: tp}, HEADER_TOKEN).then(res=>{
                let d = res.data
                if(d.success){
                    toast(d.message)
                    let tps = [...topics]
                    tps.push({topic: tp, status: "Active", numQns: 0})
                    tps.sort((a, b)=>{
                        let fa = a.topic.toLowerCase(),
                        fb = b.topic.toLowerCase();
                        if (fa < fb) {
                            return -1;
                        }
                        if (fa > fb) {
                            return 1;
                        }
                        return 0;
                    })
                    let actives = tps.filter(t=>t.status === 'Active')
                    let inactives = tps.filter(t=>t.status === 'Inactive')
                    let ars = actives.concat(inactives)
                    setTopics(ars)
                    setShow(false)
                    setTp("")
                }else{
                    toast(d.message)
                }
            })
        }
    }
    const onChange = (e)=>{
        let v = e.target.value
        if(v ===""){
            setMt([])
        }else{
            let nm = [...topics]
            let nnm = nm.filter(n=>n.topic.includes(v))
            setMt(nnm)
        }
        setTp(v)
    }
    return(
        <div className={show?"add-topic-p show":"add-topic-p"} >
            <div style={{display: 'flex'}}>
                <TextField value={tp} onChange={onChange} variant='outlined' label="Enter Topic" size='small' />
                <Button onClick={addTopic} variant='outlined' startIcon={<AddCircle/>} sx={{marginLeft: '6px', alignSelf: 'center'}}>Add</Button>
                <div style={{position: 'absolute', right:-22, top: -22}}>
                    <IconButton size='small' onClick={()=>setShow(false)}><CloseIcon /></IconButton>
                </div>
            </div>
            <div className='mt-topics-c'>
            {
                mt.map(t=><Topic text={t.topic} />)
            }
            </div>
        </div>
    )
}
export default AddTopic