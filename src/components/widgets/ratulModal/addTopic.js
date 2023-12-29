import { Button, IconButton, TextField, InputBase, Paper } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import './addTopic.css'
import { AddCircle } from '@mui/icons-material'
import CircularProgress from '@mui/material/CircularProgress'
import SearchIcon from '@mui/icons-material/Search';
import Topic from './topic';
import { useState } from 'react';
import axios from 'axios'
import { API_ENDPOINT, HEADER_TOKEN } from '../../../constants/constants';
const AddTopic = (props)=>{
    const {showAddTopic, setShowAddTopic, currentTopic, setCurrentTopic} = props
    const [topics, setTopics] = useState([])
    const [tp, setTp] = useState("")
    const [adding, setAdding] = useState(false)
    const onCancel  = ()=>{
        setShowAddTopic(false)
    }
    const onSave = ()=>{
        setShowAddTopic(false)
    }
    const onChange = (e)=>{
        let v = e.target.value
        setTp(v)
        if(v !== ""){
            axios.post(API_ENDPOINT+'trainer/trainer-topics-filter', {topic: v}, HEADER_TOKEN).then(res=>{
                let d = res.data
                if(d.success){
                    setTopics(d.message)
                }
            })
        }else{
            setTopics([])
        }
    }

    const addTopic  = ()=>{
        if(tp !== ""){
            setAdding(true)
            axios.post(API_ENDPOINT+'trainer/add-topic', {topic: tp}, HEADER_TOKEN).then(res=>{
                let d= res.data
                setAdding(false)
                if(d.success){
                    setCurrentTopic(tp)
                    setShowAddTopic(false)
                }
            })
        }
    }
    return(
        <div className="add_topic" style={{display: showAddTopic?'initial':'none'}}>
            {/* <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
                >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Topic"
                    inputProps={{ 'aria-label': 'Search Topic' }}
                />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper> */}
            <div style={{display: 'flex'}}>
                <TextField autoComplete='off' value={tp} onChange={onChange} variant='outlined' label="Enter Topic" size='small' />
                {adding?<CircularProgress />:<Button onClick={addTopic} variant='outlined' startIcon={<AddCircle/>} sx={{marginLeft: '6px', alignSelf: 'center'}}>Add</Button>}
                <div style={{position: 'absolute', right:-22, top: -22}}>
                <IconButton size='small' onClick={()=>setShowAddTopic(false)}><CloseIcon /></IconButton>
                </div>
            </div>

            <div className='topics_c'>
            {
                topics.map(t=>(
                    <Topic show={showAddTopic} setShow={setShowAddTopic} text={t.topic} currentTopic={currentTopic} setCurrentTopic={setCurrentTopic}/>
                ))
            }
            </div>
    {/* 
    <div style={{marginTop: 12, textAlign: 'right'}}>
       
        <Button onClick={onSave} variant='outlined' sx={{padding: '1px 2px', textTransform: 'none', borderRadius: 4}}>Save</Button>
        <Button onClick={onCancel} variant='outlined' sx={{padding: '1px 2px', textTransform: 'none', borderRadius: 4, marginLeft: '16px'}}>Cancel</Button>
    
        </div>  
    */}
    </div>
    )
}
export default AddTopic 