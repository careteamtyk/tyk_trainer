import online1 from '../../assets/svgs/Online_test1.svg'
import DurationPicker from 'react-duration-picker'
import IconLabel from '../widgets/iconLabel'
import lb from '../../assets/svgs/light_bulb.svg'
import clockIcon from '../../assets/svgs/clock.svg'
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import CreateOptions from '../widgets/createOptions'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import option1 from '../../assets/svgs/option1.svg'
import option2 from '../../assets/svgs/manual_pick_option2.svg'
import option3 from '../../assets/images/excel_icon_round.png'
import option4 from '../../assets/svgs/manual_create_option4.svg'
import {toast} from 'react-toastify';
import { CircularProgress } from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import './details.css'
import { useEffect, useRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'
import CustomCircularP from '../widgets/customCircularP'
import { API_ENDPOINT, DEFAULT_ASSESSMENT_ICON, HEADER_TOKEN } from '../../constants/constants'
import { getDraft, getHeader, getRemainingDays, isDraftExists, saveDraft } from '../../utilities/utility'
import ImgUpload from '../img-upload/imgUpload'
import { useNavigate } from 'react-router-dom'
const Details = ({assessment, option, setOption, questions, setQuestions, banner, setBanner, setS, at, ad, setAt, setAd})=>{
    const [loading, setLoading] = useState(false)
    const file_inp = useRef()
    const [planChecking, setPlanChecking] = useState(false)
    const [pageLoading, setPageLoading] = useState(false)
    const loc = document.location.href.replace(/\/+$/, "")
    const keysUrl = loc.split('/')
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(keysUrl.length>5){
            let draft = keysUrl[5]
            if(draft==="draft"){
                if(isDraftExists()){
                    let a = getDraft()
                    if(typeof a.duration !== "number")
                        a.duration = 30
                    setBanner(a.banner)
                    setAt(a.title)
                    setAd(a.duration)
                    setQuestions(a.questions)
                }
            }else if(keysUrl.length == 7){
                let linkCode = keysUrl[6]
                loadAssessment(linkCode)   
            }
        }
        
        //checkPlan()
    }, [])

    function loadAssessment(linkCode){
        setPageLoading(true)
        axios.post(API_ENDPOINT +'trainer/get-assessment', {linkCode: linkCode}, HEADER_TOKEN).then(res=>{
            let d = res.data
            if(d.success){
                let a = d.message
                setBanner(a.banner)
                setAt(a.title)
                setAd(a.duration)
                setQuestions(a.questions)
                setPageLoading(false)
            }else{
                toast(d.message)
            }

        })
    }
    function checkPlan(){
        setPlanChecking(true)
        axios.get(API_ENDPOINT+'trainer/check-plan', getHeader()).then(res=>{
            setPlanChecking(false)
            let d = res.data
            if(d.success){
                let planO = d.message.plan
                let remDays = getRemainingDays(planO)
                if(remDays<=0 || (planO.assessmentCount - planO.used)<=0){
                    //expired
                    document.location.href = '/trainer/subscription'
                }
            }
        })
    }
    const goToDraft = ()=>{
        document.location.href = "/trainer/create-assessment/draft"
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
                    assessment.banner = d.message
                    saveDraft(assessment)
                }else{
                    toast(d.message)
                }
            })
        
        }
    }
    const addBanner =()=>{
        file_inp.current.click()
    }
    const optionSelect = (o)=>{
        setOption(o)
    }
    const goNext = ()=>{
        if(at === "")
            toast("Please Enter Assessment Title")
        else{
            //apple-icon.png
            if(banner===""){
                setBanner('/apple-icon.png')
            }
            setS("Step 2")
        }
            
    }
    const onTitleChange = (e)=>{
        let v = e.target.value
        assessment.title = v
        saveDraft(assessment)
        setAt(v)
    }
    const onDurationChange = (e)=>{
        let v = e.target.value
        if(typeof v === "number"){
            assessment.duration = v
            saveDraft(assessment)
            setAd(v)
        }
    }
    const onCloseImg = ()=>{
        setBanner("")
    }

    const options = [
        {icon: option1, id: "option1", title: "Random pick from question bank", desc: 'Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Is Simply Dummy TLorem Ipsum'},
        {icon: option2, id: "option2", title: "Manual pick from question bank", desc: 'Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Is Simply Dummy TLorem Ipsum'},
        {icon: option3, id: "option3", title: "Upload from excel", desc: 'Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Is Simply Dummy TLorem Ipsum'},
        {icon: option4, id: "option4", title: "Manual Creation", desc: 'Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Is Simply Dummy TLorem Ipsum'}
    ]
    return(
        <div className='assessment-details'>
            <CustomCircularP show={planChecking}/>
        {!pageLoading?
            <>
              <input onChange={onImgSelect} ref={file_inp} type="file" accept="image/*" style={{display: 'none'}} />
            <div className='ad-c'>
                <IconLabel icon={lb} isMUI={false} label="Assessment Title" is={24} ls={17} gap={12} />
                <div style={{display: 'flex'}}>
                <div style={{flex: 0.6, position: 'relative'}}>
                
                <TextField onChange={onTitleChange} value={at} fullWidth variant="standard" size='small' label='Enter Assessment title'  /></div>
                
                <div className='ad-c-b'>
                    {/* {!loading?
                        <IconButton onClick={addBanner} size='large'> <AddPhotoAlternateIcon /></IconButton>:<CircularProgress />
                    }
                    { banner !=="" && banner !== DEFAULT_ASSESSMENT_ICON?
                        <div style={{width: '90px', height: '90px', position: 'absolute', bottom: 0, backgroundColor: '#ddd', border: '1px solid rgb(121, 120, 233)', borderRadius: '4px'}}>
                        <img src={banner} alt="" style={{width: '100%', height: '100%'}}/>
                        <IconButton onClick={onCloseImg} className='close-btn-icon' aria-label="delete" size="small">
                            <CloseIcon />
                        </IconButton>
                        </div>:''
                    } */}
                    <ImgUpload banner={banner} setBanner={setBanner}/>
                    
                </div>
                </div>
                <br />
                <IconLabel icon={clockIcon} isMUI={false} label="Assessment duration" is={24} ls={17} gap={12}  />  
                <div style={{maxWidth: 200, marginTop: 24}}>
                <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Select duration</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Select duration"
    value={ad}
    onChange={onDurationChange}
  >
    <MenuItem value={2}>2 minutes</MenuItem>
    <MenuItem value={15}>15 minutes</MenuItem>
    <MenuItem value={20}>20 minutes</MenuItem>
    <MenuItem value={30}>30 minutes</MenuItem>
    <MenuItem value={45}>45 minutes</MenuItem>
    <MenuItem value={60}>60 minutes</MenuItem>
    <MenuItem value={90}>90 minutes</MenuItem>
    <MenuItem value={120}>120 minutes</MenuItem>
    <MenuItem value={180}>180 minutes</MenuItem>
  </Select>
</FormControl>
</div>
                <br />
                <h3>How do you want to create?</h3>
                <div style={{display: 'flex'}}>
                    {options.map((o, i, arr)=>(
                        <div style={{flex: 1, marginLeft: (i>0)?12:'initial'}}><CreateOptions onClick={()=>optionSelect(o.id)} icon={o.icon} title={o.title} desc={o.desc}  active={o.id===option}/></div>
                    ))}
                </div>
                <div style={{textAlign: 'center'}}>
                    <div style={{marginTop: '16px', display: 'inline-flex'}}>
                    <div style={{marginRight: '16px', alignSelf: 'center'}}><Button onClick={goToDraft} startIcon={<SaveAsIcon />} variant="outlined" style={{height: '32px'}}>Draft</Button></div>
                        <Button onClick = {goNext} variant="contained" endIcon={<ArrowForwardIosIcon />}>
                            Next
                        </Button>
                    </div>
                </div>
            </div>
            <div style={{flex: 0.35}}>
                {/* <img style={{width: '90%', borderRadius: '8px', marginLeft: '10px'}} src={banner===""?online1:banner} alt=""/> */}
            </div>
            </>: <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
      <CircularProgress />
    </div>
}
        </div>
    )
}
export default Details