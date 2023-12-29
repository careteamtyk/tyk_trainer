import CreateTab from "../widgets/createTab"
import Details from "./details";
import ti1 from '../../assets/svgs/ti1.svg'
import ti2 from '../../assets/svgs/ti2.svg'
import ti3 from '../../assets/svgs/ti3.svg'
import ti4 from '../../assets/images/ti4.png'
import { useEffect, useState } from "react";
import SelectionMode from "./modeSelection";
import Preview from "./preview";
import Create from "./create";
import {toast } from "react-toastify";
import { duration } from "@mui/material";
import { DEFAULT_ASSESSMENT_ICON, DEFAULT_BANNER } from "../../constants/constants";
const CreateAssessment = ({setCollapse})=>{
    const [s, setS] = useState("Step 1")
    const [at, setAt] = useState("")
    const [ad, setAd] = useState(30)
    const [banner, setBanner] = useState(DEFAULT_BANNER)
    const [questions, setQuestions] = useState([])
    const [option, setOption] = useState("option1")
    const assessment = {
        banner: banner,
        title: at, 
        duration: duration,
        questions: questions
    }
    useEffect(()=>{
        setCollapse(prev=>!prev)
    }, [])

    const onTab1 = (step)=>{
        if(step !== "Step 1"){
            if(at ==="")
                toast("Please Enter Assessment Title")
            else{
                // if(banner===""){
                //     setBanner(DEFAULT_ASSESSMENT_ICON)
                // }
                setS(step)
            } 
        }else
            setS(step)
    }
    const tabs = [
        {icon: ti1, title: 'Assessment Details', step: 'Step 1'},
        {icon: ti2, title: 'Add Questions', step: 'Step 2'},
        {icon: ti3, title: 'Preview Assessment', step: 'Step 3'},
        {icon: ti4, title: 'Configure & Create', step: 'Step 4'}
    ]
    return(
        <div className="ca_c">
            <div style={{display: 'flex'}}>
                {
                    tabs.map((t, i, arr)=>{
                        return <div style={{flex: 1}}><CreateTab onClick={()=>onTab1(t.step)} icon={t.icon} index={i} size={arr.length} title={t.title} step={t.step} active={s===t.step}/></div>
                    })
                }
            </div>
            <div style={{paddingTop: 18, paddingLeft: 16, paddingBottom: 16, paddingRight: 12, background: 'white'}}>
                {s==="Step 1"?<Details assessment={assessment} banner={banner} setBanner={setBanner}  at={at} ad={ad} setAt={setAt} setAd={setAd} questions={questions} setQuestions={setQuestions} option = {option} setOption={setOption} setS={setS}/>:''}
                {s==="Step 2"?<SelectionMode assessment={assessment} banner={banner} questions={questions} setQuestions={setQuestions} at={at} ad={ad} option = {option} setS={setS}/>:''}
                {s==="Step 3"?<Preview assessment={assessment} banner={banner} questions={questions} setQuestions={setQuestions} at={at} ad={ad} setS={setS}/>:''}
                {s==="Step 4"?<Create setCollapse={setCollapse} assessment={assessment} banner={banner} questions={questions} at={at} ad={ad} setS={setS}/>:''}
            </div>

        </div>
    )
}
export default CreateAssessment