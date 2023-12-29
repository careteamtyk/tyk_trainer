import { Button, FormControlLabel, Switch } from '@mui/material'
import { useState } from 'react'
import RdModal from '../../widgets/ratulModal/rdModal'
import AddIcon from '@mui/icons-material/Add';
import './modes.css'
import ViewQuestionBox from './questionsbox/viewQuestionBox';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SearchIcon from '@mui/icons-material/Search';
import { v4 as uuid } from 'uuid';
import QuestionsList from './questionsList';
const ManualCreation = (props)=>{
    const {at, ad, questions, setQuestions, setS} = props
    const [showModal, setShowModal] = useState(false)

    const act= ()=>{
        setShowModal(!showModal)
    }
    const onBack = ()=>{
        setS("Step 1")
    }
    const onFront = ()=>{
        setS("Step 3")
    }
    return(
        <div className='manual_creation'>
            <RdModal questions={questions} setQuestions={setQuestions}  showModal={showModal} setShowModal={setShowModal}/>
            <div style={{display: 'flex', width: '100%'}}>
                <div style={{flex: 0.4}}>
                    <div style={{marginTop: 24, display: 'table', marginLeft: 'auto', marginRight: 'auto'}}>
                        <div style={{fontSize: 20}}>Create questions manually</div>
                        <div style={{display: 'table', marginLeft: 'auto', marginRight: 'auto', marginTop: 16}}><Button onClick={act}  startIcon={<AddIcon />} variant='contained'>Add Question</Button></div>
                    </div>
                </div>
                <div style={{flex: 0.6}}>
                <QuestionsList questions={questions} setQuestions={setQuestions}/>
                </div>
            </div>

            <div style={{display: 'flex',  margin: 'auto', justifyContent: 'center', marginTop: 48}}>
    <Button onClick = {onBack}  variant="contained" startIcon={<ArrowBackIosNewIcon />}>Previous</Button>
    <div style={{marginLeft: 16}}><Button onClick={onFront}  variant="contained" endIcon={<ArrowForwardIosIcon />}>Next</Button></div>
    </div>
        </div>
    )
}
export default ManualCreation