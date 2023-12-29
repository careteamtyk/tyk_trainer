import { useReactToPrint } from 'react-to-print';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ReactToPrint from 'react-to-print';
import { Button } from "@mui/material";
import {useEffect, useRef, useState } from "react";
import Response from "./response";
import './answerSheet.css'

const AnswerSheet = ()=>{
    const [showDownload, setShowDownload] = useState(false)
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
    return(
        <div>
        
          <Response showDownload = {showDownload} setShowDownload={setShowDownload} ref={componentRef} />

            {showDownload && <div className='ur-print-btn'>
            <Button size='small' onClick={handlePrint} startIcon={<CloudDownloadIcon />} variant='outlined'>Download Report</Button>
            </div>}
        
        </div>
    )
}
export default AnswerSheet