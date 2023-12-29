import './questionsbox.css'
import parse from 'html-react-parser';
import { Button, IconButton } from '@mui/material';
import EditModal from '../../../widgets/ratulModal/editModal';
import { useState } from 'react';
import { cleanO } from '../../../../utilities/utility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SimpleDeleteDialog from '../../../widgets/ratulModal/simpleDeleteDialog';
import SimpleEditModal from '../../../widgets/ratulModal/simpleEditModal';
const ViewQuestionBox = (props)=>{
    const {q, showAns, onQnDeleted, onEdited, qnum} = props
    const [showModal, setShowModal] = useState(false)
    const [dopen, setDopen] = useState(false)
    const remove = ()=>{
        setDopen(!dopen)
    }
    const edit  = ()=>{
        setShowModal(true)
    }
    const deleteQn = ()=>{
        setDopen(false)
        onQnDeleted(q.question_id)
    }
    const edited = (qn)=>{
        onEdited(qn)
    }
    return(
        <div className='view_question'>
            <SimpleDeleteDialog dopen = {dopen} setDopen= {setDopen} onQnDeleted={deleteQn}/>
            <SimpleEditModal toEditQ={q} showModal={showModal} onEdited={edited} setShowModal={setShowModal}/>
            <div className='v_action_qn'>
               
                <IconButton className='tk-icon-button' onClick={remove} aria-label="delete" >
                    <DeleteIcon fontSize="small"/>
                </IconButton>
                <IconButton className='tk-icon-button' onClick={edit} aria-label="edit" >
                    <EditIcon fontSize="small"/>
                </IconButton>
            </div>
            <div className='v_qn_qn'><span className='qnum_c'>{`Q ${qnum}.`}</span> {parse(cleanO(q.question))}</div>
                <div style={{display: showAns?'initial':'none'}}>
                <div className='v_option'>
                    <div className={q.options[0].isCorrect?'answer':'option'}>A) {parse(cleanO(q.options[0].option))}</div>
                    <div className={q.options[1].isCorrect?'answer':'option'}>B) {parse(cleanO(q.options[1].option))}</div>
                </div>
                <div className='v_option'>
                    {q.options.length>2 && <div className={q.options[2].isCorrect?'answer':'option'}>C) {parse(cleanO(q.options[2].option))}</div>}
                    {q.options.length>3 && <div className={q.options[3].isCorrect?'answer':'option'}>D) {parse(cleanO(q.options[3].option))}</div>}
                </div>
                <div className='v_option'>
                    {q.options.length>4&&<div className={q.options[4].isCorrect?'answer':'option'}>E) {parse(cleanO(q.options[4].option))}</div>}
                    {q.options.length>5&&<div className={q.options[5].isCorrect?'answer':'option'}>F) {parse(cleanO(q.options[5].option))}</div>}
                </div>
                {/* {showAns?<><div style={{borderRadius: 12, padding: '2px 10px', border: '1px solid #ccc', display: 'table', color: 'green', marginTop: 16}}>Ans: {q.Ans}</div></>:''} */}
                <div style={{marginTop: 12, fontStyle:'italic'}}>Topic: {q.topic}</div>
                </div>
        </div>
    )
}
export default ViewQuestionBox