import './uploadExcel.css'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react';
import axios from 'axios';
import readXlsxFile from 'read-excel-file';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import ExcelWidgets from '../../../widgets/excel-widgets/excelWidgets';
import { API_ENDPOINT, HEADER_TOKEN } from '../../../../constants/constants';
import { excelAnswer, formatChecker, processData} from '../../ql/excelUtil';
import { cleanO, getHeader, getPhone } from '../../../../utilities/utility';
import { v4 as uuid } from 'uuid';
import SimpleYesNoDialog from '../../../widgets/ratulModal/SimpleYesNoDialog';
const UploadExcel = ({excelUploaded, showModal, setShowModal, onQnImported})=>{
    const [fn, setFn] = useState("")
    const [rs, setRs] = useState([])
    const [showDialog, setShowDialog] = useState(false)
    const onFileSelect = ()=>{
        //toast.success("clicked")
        document.getElementById("excel_input").click()
    }
    useEffect(()=>{
        if(!showModal){
            setFn("")
            setRs([])
           
        }
    }, [showModal])

    const handleChose = (event)=>{
        setFn(event.target.files[0].name)
        readXlsxFile(event.target.files[0]).then((rows) => { 
            if(rows[0].length>9){
                setFn("")
                document.getElementById("excel_input").value = ""
                toast("Invalid File format! Please read instructions")
            }else if(rows.length<2){
                setFn("")
                document.getElementById("excel_input").value = ""
                toast("No questions Found in the Excel sheet")
            }else{
                rows.splice(0, 1)
                let excelData = processData(rows)
                setRs(excelData)
            }
        })
    }
    const addQuestion =  ()=>{
        setShowDialog(true)
    }

    const uploadQuestionGroup = ()=>{
        const aqns = rs.filter(a=>a.formatCorrect)
        let ro = {questions: aqns}
        axios.post(API_ENDPOINT+'trainer/add-question-group', ro, getHeader()).then(res=>{
            let d = res.data
            if(d.success){
                onCompleted()
            }else{
                toast.error(d.message)
            }
        })
    }
    const onYesAddToQuestionBank = ()=>{
        uploadQuestionGroup()
    }
    const onNoAddToQuestionBank = ()=>{
        onCompleted()
        setShowDialog(false)
    }
    const onCompleted = ()=>{
        let qns = rs.filter(q=>q.formatCorrect == true)
        onQnImported(qns)
        setShowModal(false)
    }

    return(
        <div className="ql-excel">
            <SimpleYesNoDialog show={showDialog} onNoResponse={onNoAddToQuestionBank} setShow={setShowDialog} message="Do you want to add this to Question Bank?" onYesResponse={onYesAddToQuestionBank}/>
            {rs.length>0?
            <div>
                <div className='ql-excel-analytics'>
                    <h3 style={{color: 'green'}}>Excel Sheet Analytics</h3>
                   <div>Total Questions: <span style={{marginLeft: 16}}>{rs.length}</span></div>
                   <div>Total Invalid Questions: <span style={{marginLeft: 16}}>{rs.filter(r=>!r.formatCorrect).length}</span></div>
                   <div>Total Questions to Import: <span style={{marginLeft: 16}}>{rs.length - rs.filter(r=>!r.formatCorrect).length}</span></div>
                   <div style={{color: 'red', marginTop: 12}}>*Questions labelled with red background are invalid</div>
                </div>
            <div className='selected_qns'>
                <table>
                    <tr>
                    <th>Topic</th>
                    <th>Question</th>
                    <th>Option A</th>
                    <th>Option B</th>
                    <th>Option C</th>
                    <th>Option D</th>
                    <th>Option E</th>
                    <th>Option F</th>
                    <th>Answer</th>
                    </tr>
                    {
                        rs.map((r, i)=>(
                            <tr style={{backgroundColor: !!rs[i].formatCorrect?null:'#f8897c'}}>
                                <td>{r.topic}</td>
                                <td>{r.question}</td>
                                <td>{r.options[0].option}</td>
                                <td>{r.options[1].option}</td>
                                {r.options.length>2?<td>{r.options[2].option}</td>:<td></td>}
                                {r.options.length>3?<td>{r.options[3].option}</td>:<td></td>}
                                {r.options.length>4?<td>{r.options[4].option}</td>:<td></td>}
                                {r.options.length>5?<td>{r.options[5].option}</td>:<td></td>}
                                <td>{excelAnswer(r.options)}</td>
                                {/* <td><Button onClick={()=>onRemove(i)} variant="outlined" size="small">Remove</Button></td> */}
                            </tr>
                        ))
                    }
                </table>
            </div>
            <div className='ql-excel-btn-s'>
                <Button onClick={addQuestion} variant='contained'>Add Questions</Button>
            </div>
            </div>:<div className='ql-excel-i'>
                    <div className='ql-excel-i-c'>
                        <h3>Instructions for Excel Upload</h3>
                        <ul>
                            <li>You should include a header with columns as Topic, Question, option A, option B, option C, option D, option E(optional), option F(optional), Answer.</li>
                            <li>Only one option can be correct. So the Answer should be A, B, C, D, E or F.</li>
                            <li>There should be minimum of two options in the options section.</li>
                            <li>Every Question must be tagged to a Topic. A question without Topic will be discarded.</li>
                        </ul>
                    </div>
                    <ExcelWidgets onFileSelect={onFileSelect} handleChose={handleChose} fn={fn}/>
                </div>
            }
</div>
    )
}
export default UploadExcel