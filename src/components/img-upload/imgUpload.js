import { Button, CircularProgress, IconButton } from "@mui/material"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import imgP from './imgc.png'
import './imgUpload.css'
import { API_ENDPOINT, DEFAULT_ASSESSMENT_ICON, DEFAULT_BANNER, HEADER_TOKEN } from "../../constants/constants";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CloseIcon from '@mui/icons-material/Close';
const ImgUpload = (props)=>{
    const {banner, setBanner} = props
    const [loading, setLoading] = useState(false)
    const file_inp = useRef()
    const addBanner = ()=>{
        file_inp.current.click()
    }
    const onImgSelect = event=>{
        const [file] = file_inp.current.files
        if(file){
            let fd = new FormData()
            fd.append("image", file)
            setLoading(true)
            axios.post(API_ENDPOINT+'trainer/upload-image-only', fd, HEADER_TOKEN).then(res=>{
                let d = res.data
                setLoading(false)
                if(d.success){
                    setBanner(d.message)
                }else{
                    toast(d.message)
                }
            })
        
        }
    }
    const onRemovePic = ()=>{
        setBanner(DEFAULT_BANNER)
    }
    return(
        <div className="img-upload">
            
             <input onChange={onImgSelect} ref={file_inp} type="file" accept="image/*" style={{display: 'none'}} />
                <img style={{backgroundColor: '#ddd'}} src={banner===DEFAULT_BANNER? imgP:banner} alt="img"/>
               <Button disabled={loading} onClick={addBanner} variant="outlined">{banner===DEFAULT_BANNER? 'Add Image':'Change Image'}</Button>
               
               {loading?<div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                <CircularProgress />
               </div>:''}

              {banner !== DEFAULT_BANNER? <IconButton onClick={onRemovePic} sx={{position: 'absolute', zIndex: 2, right: 0, top: 0}} aria-label="close" size="small"><CloseIcon /></IconButton>:''}
        </div>
    )
}
export default ImgUpload