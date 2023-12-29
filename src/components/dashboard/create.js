import './trainer.css'
import Switch from '@mui/material/Switch';
import ConfigItem from './optionmodes/configItem';
import { useEffect, useState } from 'react';
import { Button, Checkbox, CircularProgress } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import axios from 'axios';
import { API_ENDPOINT, HEADER_TOKEN } from '../../constants/constants';
import {toast} from 'react-toastify';

import Qsize from '../widgets/qSize';
import DateTimePicker from 'react-datetime-picker';
import { getHeader } from '../../utilities/utility';
import { v4 as uuid } from 'uuid';
const Create = (props)=>{
    const {setCollapse} = props
/*
 flexible: true means it is not controlled by trainer
 flexible: false means it is controlled by trainer 
*/

    const {questions, banner, at, ad, setS} = props
    const [showAnswer, setShowAnswer] = useState(false)
    const [allowBack, setAllowBack] = useState(true)
    const [previewCorrect, setPreviewCorrect] = useState(true)
    const [previewStatus, setPreviewStatus] = useState(false)
    const [allowReport, setAllowReport] = useState(true)
    const [shuffleQuestions, setShuffleQuestions] = useState(false)
    const [shuffleOptions, setShuffleOptions] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date());
    const [flexible, setFlexible] = useState(false)
    function countUnique(arr){
        return arr.filter((a, i) => arr.findIndex((s) => a.topic === s.topic) === i).length
     }
    const onBack = ()=>{
        setS("Step 3")
    }


    const handlePreviewCorrectChange = () => {
        setPreviewCorrect(!previewCorrect)
        if(previewCorrect)
            setPreviewStatus(true)
        else{
            setPreviewStatus(false)
        }
    }
    const handlePreviewStatusChange = () => {
        setPreviewStatus(!previewStatus)
        if(previewStatus){
            setPreviewCorrect(true)
        }else{
            setPreviewCorrect(false)
        }
    } 
    const create = ()=>{
        if(at === ""){
            toast("Please Enter Assessment title first")
        }else if(questions.length ===0){
            toast("The assessment has no questions")
        }else{
            if(flexible){ 
                // let now = new Date()
                // let ms = startDate.getTime()-now.getTime()
                // let minutes = Math.floor(ms / 60000)
                // if(minutes<ad){
                //     toast("The start date should account for the assessment duration")
                //     return
                // }
                let durDiff = endDate.getTime() - startDate.getTime()
                let durDiffMins = Math.floor(durDiff/60000)
                if(durDiffMins<ad){
                    toast("The start date and end date should account for the assessment duration")
                    return
                }
            }else{

            }
            let aQns = [...questions]
            aQns.map(qn=>{
                qn.question_id = uuid()
            })
            const assessment = {
                title: at,
                duration: ad,
                questions: aQns,
                numQns: aQns.length,
                banner: banner,
                numTopics: countUnique(aQns),
                startDate: startDate,
                endDate: endDate,
                flexible: flexible,
                config: {
                    showAnswer, allowBack, previewCorrect, previewStatus, allowReport, shuffleQuestions, shuffleOptions
                } 
            }
            setIsSubmitting(true)
            axios.post(API_ENDPOINT+'trainer/create-assessment/', assessment, getHeader()).then(res=>{
                setIsSubmitting(false)
                let d = res.data
                if(d.success){
                    toast(d.message)
                    document.location.href = "/trainer"
                }else{
                    toast(d.message)
                }
            })
        }
    }
    return(
        <div>
            {isSubmitting? <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
      <CircularProgress />
    </div>:''}
            <div className="config_assessment">
                <div style={{display: 'flex', justifyContent: 'center', margin: '8px 10px 16px 10px'}}>
                <img src={banner} style={{borderRadius: '50%', width: '96px',height: '96px', objectFit: 'cover'}} alt=""/>
                    <div style={{marginLeft: '12px'}}>
                        <div style={{fontSize: 20, marginTop: 12}}>{at}</div>
                        <div style={{display: 'table', margin: 'auto', marginBottom: 16}}>
                        <Qsize numQns = {questions.length} numTopics = {countUnique(questions)} duration={ad}/>
                        </div>
                    </div>
                </div>
                <div style={{border: '1px solid #ccc', borderRadius: 8, padding: 12}}>
                    <div style={{display: 'flex'}}>
                    <Checkbox checked={flexible} onChange={()=>setFlexible(!flexible)} /> <div style={{alignSelf: 'center'}}>Is this assessment flexible?</div>
                    </div>
                    <div style={{fontStyle: 'italic', color: '#777', fontSize: 14}}>Flexible assessments will allow participants to attend the assessment without your help during the defined time period. You don't have to start the assessment before participants Can attend the assessment Just create and define the availability and share the code with he participants.</div>
                    {flexible?
                    <div style={{display: 'flex'}}>
                        <div style={{flex: 1}}>
                            <div style={{fontWeight: 600, marginTop: 12, color: '#666'}}>Assessment Start time</div>
                            <div style={{marginTop: 6}}>
                            <DateTimePicker onChange={setStartDate} value={startDate} />
                            </div>
                        </div>
                        <div>
                            <div style={{fontWeight: 600, marginTop: 12, color: '#666'}}>Assessment End time</div>
                            <div style={{marginTop: 6}}>
                            <DateTimePicker onChange={setEndDate} value={endDate} />
                            </div>
                        </div>
                    </div>
                    
                    :''}
                </div>
               <ConfigItem text="Need to show the answer after each question?" checked={showAnswer} setChecked={setShowAnswer} />
               <ConfigItem text="Allow candidate to click back to previous question?" checked={allowBack} setChecked={setAllowBack} />
               {/* <ConfigItem text="Preview questions with correct answer" checked={previewCorrect} setChecked={setPreviewCorrect}/>
               <ConfigItem text="Preview questions with answer status" checked={previewStatus} setChecked={setPreviewStatus}/> */}
                <div className='config_item'>
                    <div>Preview questions with correct answer</div><Switch checked={previewCorrect} onChange={handlePreviewCorrectChange} />
                </div>
                <div className='config_item'>
                    <div>Preview questions with answer status</div><Switch checked={previewStatus} onChange={handlePreviewStatusChange} />
                </div>
               <ConfigItem text="Allow report download" checked={allowReport} setChecked={setAllowReport}/>
               <ConfigItem text="Shuffle questions" checked={shuffleQuestions} setChecked={setShuffleQuestions}/>
               <ConfigItem text="Shuffle answers" checked={shuffleOptions} setChecked={setShuffleOptions}/>

            </div>
            <div style={{display: 'flex',  margin: 'auto', justifyContent: 'center', marginTop: 48}}>
    
                <Button onClick = {onBack} sx={{textTransform: 'none', borderRadius: 12}}  variant="contained" startIcon={<ArrowBackIosNewIcon />}>Previous</Button>
                <div style={{marginLeft: 16}}><Button sx={{textTransform: 'none', borderRadius: 12, backgroundColor: 'green'}} onClick={create}  variant="contained" startIcon={<DriveFileRenameOutlineIcon />}>Create</Button></div>
    
            </div>
        </div>
    )
}
export default Create