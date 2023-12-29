import './rdModal.css'
import {useEffect, useRef, useState} from 'react'
import { Editor } from 'react-draft-wysiwyg';
import {convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import { EditorState } from 'draft-js';
import OptionAns from './optionAns';
import { Button, CircularProgress, IconButton, Input } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TopicIcon from '@mui/icons-material/Topic';
import AddTopic from './addTopic';
import Topic from './topic';
import axios from 'axios';
import { API_ENDPOINT, HEADER_TOKEN } from '../../../constants/constants';
import { optionChecker } from '../../../utilities/utility';
import YesNoDialog from './YesNoDialog';
const SimpleAddQuestion = (props)=>{ 
    const {showModal, onQnAdded, setShowModal} = props
    
    const [showAddTopic, setShowAddTopic] = useState(false)
    const [question, setQuestion] = useState("")
    
    const [totalOptions, setTotalOptions] = useState(4)
    const [optionA, setOptionA] = useState("")
    const [optionB, setOptionB] = useState("")
    const [optionC, setOptionC] = useState("")
    const [optionD, setOptionD] = useState("")
    const [optionE, setOptionE] = useState("")
    const [optionF, setOptionF] = useState("")
    const [ca, setCa] = useState("")
    const [dopen, setDopen] = useState(false)
    
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [currentTopic, setCurrentTopic] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const onEditorStateChange = editorState => {
        setEditorState(editorState);
        setQuestion(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }
    function resetState(){
        setQuestion("")
        setOptionA("")
        setOptionB("")
        setOptionC("")
        setOptionD("")
        setOptionE("")
        setOptionF("")
        setCurrentTopic("")
        setEditorState(EditorState.createEmpty())
        setCa("")
    }
    useEffect(()=>{
        if(showModal){
            modal.current.style.display = 'flex'
            modal.current.style.justifyContent = 'center'
            modal.current.style.animation = "showa 0.6s both"
        }
        resetState()
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
    const addClick = (e)=>{
        e.stopPropagation()
        if(totalOptions<6)
            setTotalOptions(totalOptions+1)
    }
    const onSave = ()=>{
        if(question.length<8){
            toast("Please Enter Question")
        }else if(optionA === ""){
            toast("Please Enter Option A")
        }else if(optionB === ""){
            toast("Please Enter Option B")
        }else if(currentTopic === ""){
            toast("Please select topic")
        }else if(ca === ""){
            toast("Please select correct answer")
        }else{
           //add the question
           setDopen(true)
        }
    }
    const completeAdd = ()=>{
        let ops = []
        ops.push({option: optionA, isCorrect: ca==="A", optionId: uuid()})
        ops.push({option: optionB, isCorrect: ca==="B", optionId: uuid()})
        if(totalOptions>2 && optionC !== "")
            ops.push({option: optionC, isCorrect: ca==="C", optionId: uuid()})
        if(totalOptions>3 && optionD !== "")
            ops.push({option: optionD, isCorrect: ca==="D", optionId: uuid()})
        if(totalOptions>4 && optionE !== "")
            ops.push({option: optionE, isCorrect: ca==="E", optionId: uuid()})
        if(totalOptions === 6 && optionF !== "")
            ops.push({option: optionF, isCorrect: ca==="F", optionId: uuid()})

        let question_id = uuid()

        const dv = document.createElement('div')
        dv.innerHTML = question
        let firstChild = dv.firstElementChild  //question html
        let chnodes = dv.children

        
        
        let span = document.createElement('span')
        span.innerHTML = firstChild.innerHTML

        let bodySpan = document.createElement('span')
        bodySpan.append(span)
        for (let i = 1;i<chnodes.length;i++){
            bodySpan.append(chnodes[i])
        }

        let qf = {question: bodySpan.outerHTML, question_id: question_id, topic: currentTopic, options: ops}
        onQnAdded(qf)
        hideModal()
        toast("Added Successfully")
    }
    const sAddTopic = ()=>{
        setShowAddTopic(!showAddTopic)
    }   
    const uploadCallback = (file, callback) => {
        return new Promise((resolve, reject) => {
          const reader = new window.FileReader();
          reader.onloadend = async () => {
             const form_data = new FormData();
             form_data.append("image", file);
             
             axios.post(API_ENDPOINT+'trainer/upload-image-only', form_data, HEADER_TOKEN).then(res=>{
                let d = res.data
                if(d.success){
                    resolve({ data: { link:d.message} });
                }else{
                    toast(d.message)
                }
             })

          };
          reader.readAsDataURL(file);
        });
      }
      const config = {
        image: { uploadCallback: uploadCallback },
        previewImage: true,
      }
    const onYesResponse = ()=>{
        setDopen(false)
        let ops = []
        ops.push({option: optionA, isCorrect: ca==="A", optionId: uuid()})
        ops.push({option: optionB, isCorrect: ca==="B", optionId: uuid()})
        if(totalOptions>2 && optionC !== "")
            ops.push({option: optionC, isCorrect: ca==="C", optionId: uuid()})
        if(totalOptions>3 && optionD !== "")
            ops.push({option: optionD, isCorrect: ca==="D", optionId: uuid()})
        if(totalOptions>4 && optionE !== "")
            ops.push({option: optionE, isCorrect: ca==="E", optionId: uuid()})
        if(totalOptions === 6 && optionF !== "")
            ops.push({option: optionF, isCorrect: ca==="F", optionId: uuid()})

        let question_id = uuid()
        
        const dv = document.createElement('div')
        dv.innerHTML = question
        let firstChild = dv.firstElementChild
        let chnodes = dv.children
        let span = document.createElement('span')
        span.innerHTML = firstChild.innerHTML
        let bodySpan = document.createElement('span')
        bodySpan.append(span)
        for (let i = 1;i<chnodes.length;i++){
            bodySpan.append(chnodes[i])
        }

        let qf = {question: bodySpan.outerHTML, question_id: question_id, topic: currentTopic, options: ops}
        onQnAdded(qf)
        hideModal()
        toast("Added Successfully")
        axios.post(API_ENDPOINT+'trainer/add-qn-lib-man', qf, HEADER_TOKEN).then(res=>{ })
    }
    const onNoResponse = ()=>{
        setDopen(false)
        completeAdd()
    } 
    return(
        <div ref={modal} onAnimationEnd={animEnd}  className="modal">
             <YesNoDialog dopen = {dopen} message="Do you want to save to Question Library?" setDopen= {setDopen} onNoResponse={onNoResponse} onYesResponse={onYesResponse}/>
            <div onClick={e=>e.stopPropagation()} className="modal-content">
                <div className="modal-header">
                <span onClick={close} className="close">&times;</span>
                </div>
                <div className="modal-body">
                    <div style={{position: 'absolute', zIndex: 20, left: '50%', top: '50%', transform: 'translate(-50%, -50%)', display: isSubmitting?'initial':'none'}}><CircularProgress /></div>
                    <div className="editor_container">
                        <div style={{display: 'flex', position: 'absolute', right: 24, top: 14, cursor: 'pointer'}}>
                        <Button className='c_add_topic' onClick = {sAddTopic} startIcon={<TopicIcon />} variant='outlined' sx={{color: 'white', border: '1px solid white', textTransform: 'none', borderRadius: 10, marginRight: '12px', fontWeight: 400, fontSize: 12}}>
                            {currentTopic===""?"Select Topic":currentTopic}
                        </Button>
                        {/* <Button onClick = {uploadImage} startIcon={<AddPhotoAlternateIcon />} variant='outlined' sx={{color: 'white', border: '1px solid white', textTransform: 'none', borderRadius: 10, fontWeight: 400, fontSize: 12}}>
                            Upload
                        </Button> */}
                        <AddTopic currentTopic={currentTopic} setCurrentTopic={setCurrentTopic}  showAddTopic ={showAddTopic} setShowAddTopic ={setShowAddTopic} />
                        </div>
                <Editor
                    toolbar={config}
                    editorState={editorState}
                    placeholder='Type your question here...'
                    onEditorStateChange={onEditorStateChange}
                />
                <div className="answer_c">
                    <OptionAns isAns={ca==="A"} setCa={setCa} show={true} showD={false} totalOptions={totalOptions} setTotalOptions={setTotalOptions}  ans={optionA} setAns = {setOptionA} op="A" optionL="Option A" text="Enter Answer" /> 
                    <OptionAns isAns={ca==="B"} setCa={setCa} show={true} showD={false} totalOptions={totalOptions} setTotalOptions={setTotalOptions}  ans={optionB} setAns = {setOptionB} op="B" optionL="Option B" text="Enter Answer" ls={6}/> 
                    <OptionAns isAns={ca==="C"} setCa={setCa} show={true} showD={false} totalOptions={totalOptions} setTotalOptions={setTotalOptions}  ans={optionC} setAns = {setOptionC} op="C" optionL="Option C" text="Enter Answer" ls={6}/>
                    <OptionAns isAns={ca==="D"} setCa={setCa} show={true} showD={false} totalOptions={totalOptions} setTotalOptions={setTotalOptions}  ans={optionD} setAns = {setOptionD} op="D" optionL="Option D" text="Enter Answer" ls={6}/>            
                   
                    <OptionAns isAns={ca==="E"} setCa={setCa} show={totalOptions>=5} showD={totalOptions===5} totalOptions={totalOptions} setTotalOptions={setTotalOptions} ans={optionE} setAns = {setOptionE} op="E" optionL="Option E" text="Enter Answer" ls={6}/>
                   
                    <OptionAns isAns={ca==="F"} setCa={setCa} show={totalOptions===6} showD={totalOptions===6} totalOptions={totalOptions} setTotalOptions={setTotalOptions} ans={optionF} setAns = {setOptionF} op="F"  optionL="Option F" text="Enter Answer" ls={6}/>
                    
                    {
                        totalOptions<6?
                        <IconButton onClick={addClick} color="primary" component="span">
                            <AddCircleOutlineIcon sx={{fontSize: 32}} />
                        </IconButton>:''
                    }
                </div>

                </div>
                </div>
                <div className="modal-footer">
               <div style={{display: 'flex', position: 'relative',marginTop:16, marginBottom: 12,  justifyContent: 'end'}}>
               <Button onClick={close} variant='contained'>Cancel</Button>
               <Button onClick={onSave} sx={{marginLeft: 2}}  startIcon={<CloudDownloadIcon />} variant='contained'>Save</Button>
               </div>
                </div>
            </div>
        </div>
    )
}
export default SimpleAddQuestion