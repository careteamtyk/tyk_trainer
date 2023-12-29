import './rdModal.css'
import {useEffect, useRef, useState} from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import OptionAns from './optionAns';
import { Button, CircularProgress, IconButton, Input } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { toast } from 'react-toastify';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TopicIcon from '@mui/icons-material/Topic';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddTopic from './addTopic';
import Topic from './topic';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { API_ENDPOINT, HEADER_TOKEN } from '../../../constants/constants';
const SimpleEditModal = (props)=>{ 
    const {showModal, setShowModal, toEditQ, onEdited} = props
    const oo = ["A", "B", "C", "D", "E", "F"]
    const [question, setQuestion] = useState("") 
    const [totalOptions, setTotalOptions] = useState(0)
    const [optionA, setOptionA] = useState("")
    const [optionB, setOptionB] = useState("")
    const [optionC, setOptionC] = useState("")
    const [optionD, setOptionD] = useState("")
    const [optionE, setOptionE] = useState("")
    const [optionF, setOptionF] = useState("")
    const [ca, setCa] = useState("")
    
    let myqn = toEditQ.question
    let finalMyQn = ''
    if(myqn.includes("<img src") && myqn.includes("<p></p>")){
        finalMyQn = myqn
    }else if(myqn.includes("<img src")){
        let pos = myqn.indexOf("<img src")
        let mqnA = myqn.split('')
        mqnA.splice(pos, 0, "<p></p>")
        finalMyQn = mqnA.join('')
    }else{
        finalMyQn = myqn
    }
    const contentBlock = htmlToDraft(finalMyQn);



    const [ editorState, setEditorState ] = useState(EditorState.createWithContent(ContentState.createFromBlockArray(contentBlock.contentBlocks)))
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onEditorStateChange = editorState => {
        setEditorState(editorState);
        setQuestion(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }
    useEffect(()=>{
        if(showModal){
            modal.current.style.display = 'flex'
            modal.current.style.justifyContent = 'center'
            modal.current.style.animation = "showa 0.6s both"
        }
        setQuestion(toEditQ.question)
        setTotalOptions(toEditQ.options.length)
        setOptionA(toEditQ.options[0].option)
        setOptionB(toEditQ.options[1].option)
        setOptionC(toEditQ.options.length>2?toEditQ.options[2].option:'')
        setOptionD(toEditQ.options.length>3?toEditQ.options[3].option:'')
        setOptionE(toEditQ.options.length>4?toEditQ.options[4].option:'')
        setOptionF(toEditQ.options.length>5?toEditQ.options[5].option:'')
        setCa(oo[toEditQ.options.findIndex(d=>d.isCorrect === true)])
        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(contentBlock.contentBlocks)))
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
        }else if(ca === ""){
            toast("Please select correct answer")
        }else{
           let ops = []
           ops.push({option: optionA, isCorrect: ca==="A", optionId: uuid()})
           ops.push({option: optionB, isCorrect: ca==="B", optionId: uuid()})
           if(optionC !== '')
                ops.push({option: optionC, isCorrect: ca==="C", optionId: uuid()})
           if(optionD !== '')
                ops.push({option: optionD, isCorrect: ca==="D", optionId: uuid()})
           if(totalOptions>4)
                ops.push({option: optionE, isCorrect: ca==="E", optionId: uuid()})
           if(totalOptions === 6)
              ops.push({option: optionF, isCorrect: ca==="F", optionId: uuid()})
            
            
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
            let qn = {question: bodySpan.outerHTML, question_id: toEditQ.question_id, topic: toEditQ.topic, options: ops}
            onEdited(qn)
            hideModal()

        }
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
      }
    function removeHtml(s){
        let s1 = s.replaceAll('<p>', '')
        let s2 = s1.replaceAll('</p>', '')
        let s3 = s2.replaceAll('\n', '')
        return s3
    }
    return(
        <div ref={modal} onAnimationEnd={animEnd}  className="modal">
            <div onClick={e=>e.stopPropagation()} className="modal-content">
                <div className="modal-header">
                <span onClick={close} className="close">&times;</span>
                </div>
                <div className="modal-body">
                    <div style={{position: 'absolute', zIndex: 20, left: '50%', top: '50%', transform: 'translate(-50%, -50%)', display: isSubmitting?'initial':'none'}}><CircularProgress /></div>
                    <div className="editor_container">
                    <div style={{display: 'flex', position: 'absolute', right: 24, top: 14, cursor: 'pointer'}}>
                </div>
                <Editor
                    toolbar={config}
                    editorState={editorState}
                    placeholder='Type your question here...'
                    onEditorStateChange={onEditorStateChange}
                />
                <div className="answer_c">
                    {/* <div className="back_nav_icon" style={{display: total>0?'flex':'none'}}>
                    <IconButton onClick={onPrev} color="primary" component="span">
                        <ArrowBackIosNewIcon sx={{fontSize: 30}} />
                    </IconButton>
                    </div>
                    <div className="forward_nav_icon" style={{display: total>0?'flex':'none'}}>
                    <IconButton onClick={onForward} color="primary" component="span">
                    <ArrowForwardIosIcon sx={{fontSize: 30}} />
                    </IconButton>
                    </div> */}
                  
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
export default SimpleEditModal