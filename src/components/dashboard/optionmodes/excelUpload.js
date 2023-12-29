import { Button } from '@mui/material'
import './modes.css'
import QuestionsList from './questionsList'
import AddIcon from '@mui/icons-material/Add';
import excelIcon from '../../../assets/images/excel_icon_round.png'
import excelUpload from '../../../assets/images/excel_upload.png'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import excelIconSmall from '../../../assets/images/excel_upload_small.png'
import BorderAllIcon from '@mui/icons-material/BorderAll';
import readXlsxFile from 'read-excel-file'
import { useState } from 'react'
import MyModal from '../../widgets/myModal/myModal';
import UploadExcel from './excel-widgets/uploadExcel';
import { toast } from 'react-toastify';


const ExcelUpload = (props)=>{
    const {at, ad, questions, setQuestions, setS} = props
    //const [rr, setRR] = useState([])
    const [fn, setFn] = useState("")
    const [fileCorrect, setFileCorrect] = useState(true)
    const [showExcelModal, setShowExcelModal] = useState(false)

    const onBack = ()=>{
        setS("Step 1")
    }
    const onFront = ()=>{
        setS("Step 3")
    }
    const onFileSelect = ()=>{
        //document.getElementById("excel_input").click()
        setShowExcelModal(!showExcelModal)
    }
    const onTemplateDownload  = ()=>{
        document.getElementById("download_template").click()
    }

    const onQnImported = (qns)=>{
        let qs = [...questions]
        setQuestions(qs.concat(qns))
    }

    return(
        <div>
            <MyModal showModal={showExcelModal} setShowModal = {setShowExcelModal} title="Import from Excel" modalC={<UploadExcel onQnImported={onQnImported} showModal={showExcelModal} setShowModal = {setShowExcelModal}/>}/>
            <div style={{display: 'flex', width: '100%'}}>

                <div style={{flex: 0.4}}>
                    <div style={{marginTop: 24, display: 'table', marginLeft: 'auto', marginRight: 'auto'}}>
                       <div style={{display: 'flex'}}>
                        <img src={excelIcon} alt="excel" style={{width: 48, cursor: 'pointer'}}/>
                        <div style={{marginLeft: 12}}>
                            <div style={{fontSize: 17, fontWeight: 600}}>Upload questions from excel</div>
                            <div style={{fontSize: 14, color: '#444'}}>Required excel format .xlsx</div>
                        </div>
                       </div>
                       <div onClick = {onFileSelect} style={{display: 'block', border: '2px dashed #888', borderRadius: 16, marginTop: 18, cursor: 'pointer', userSelect: 'none'}}>
                            <img src={excelUpload} alt="Excel Upload" style={{width: 100, display: 'block', margin: '12px auto'}}/>
                            <div style={{textAlign: 'center', marginBottom: 16, color: fileCorrect?'green':'red'}}>{fn===""?"Click here to Upload":fn}</div>
                        </div>
                        {/* <div style={{marginTop: 12, color: '#777', marginBottom: 8}}>Download the template</div>
                        <a href='/QuestionTemplate.xlsx' download id="download_template" style={{display: 'none'}}></a>
                        <Button onClick={onTemplateDownload} startIcon={<BorderAllIcon />} sx={{padding: '1px 10px', textTransform: 'none', borderRadius: 6}} variant="outlined">Download</Button>
                    */}
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
export default ExcelUpload