import { Button, IconButton } from '@mui/material'
import QRCode from 'react-qr-code'
import './shareCard.css'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { API_ENDPOINT, HOSTNAME } from '../../constants/constants';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import {toast } from 'react-toastify';
import { useState } from 'react';

const saveSvgAsPng = require('save-svg-as-png')
const ShareCard = (props)=>{
    const {code, linkCode} = props

    const al = HOSTNAME+'assessment/'+linkCode
    const copyCode = ()=>{
        navigator.clipboard.writeText(code)
        toast("Copied Assessment Code!")
    }
    const linkCopy = ()=>{
        navigator.clipboard.writeText(al)
        toast("Copied Assessment Link!")
    }

    const downloadQrCode = ()=>{
        saveSvgAsPng.saveSvgAsPng(document.getElementById("qrCodeEl"), "QrCode_a.png");
    }

    const [zoom, setZoom] = useState(false);
  
  const handleZoom = () => setZoom(!zoom);

    return (
        <div className="share_card">
            <canvas style={{display: 'none'}} id="canvas" width="192" height="192"></canvas>
           <div style={{flex: 1}}>
               <div style={{color: 'white', marginLeft: 16}}>Invite via Code/Link</div>
               <div style={{display: 'flex', marginTop: 12, background: 'white', borderRadius: 16, padding: '1px 8px', marginLeft: 12}}>
                    <div style={{color: '#333', flex: 1, fontSize: 16, alignSelf: 'center'}}>{code}</div>
                    <IconButton onClick={copyCode} color="secondary" aria-label="Copy">
                    <ContentCopyIcon />
                    </IconButton>
               </div>
               <div style={{display: 'flex', background: 'white', padding: 1, marginLeft: 12, marginTop: 12, marginRight: 8, borderRadius: 12, maxWidth: '230px'}}>
                   <div style={{flex: 1, marginLeft: 12, color: '#777', fontSize: 14, alignSelf: 'center', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', marginRight: 8}}>{al}</div>
                    <Button variant='contained' onClick={linkCopy} startIcon={<InsertLinkIcon/>}>Copy Link</Button>
               </div>
           </div>
           <div>
               <div style={{color: 'white', fontSize: 14, marginBottom: 6, textAlign: 'center'}}>Invite via QRCode</div>
           <center>
           {zoom && (
        <div className="overlay" onClick={handleZoom}>
          <QRCode id="qrCodeEl" size={360} value={al} />
        </div>
      )}
      <div onClick={handleZoom}>
        <QRCode id="qrCodeEl" size={90} value={al} />
      </div>
           <Button startIcon={<CloudDownloadIcon />} variant='contained' onClick={downloadQrCode}>Download QR</Button></center>
           </div>
            
        </div>
    )
}
export default ShareCard