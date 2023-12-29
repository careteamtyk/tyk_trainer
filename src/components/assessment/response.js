import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { API_ENDPOINT } from "../../constants/constants"
import {toast } from 'react-toastify';

import AnswerBox from "./live/widgets/answerBox";
import './response.css'
import applogo from '../../assets/svgs/applogo.svg'
import aprofile from '../../assets/images/aprofile.png'
import Header from "../dashboard/header";
import appLogo from '../../assets/svgs/applogo.svg'
import PreviewAnswerBox from "./live/widgets/PreviewAnswerBox";


const Response = React.forwardRef((props, ref)=>{
    const {showDownload, setShowDownload} = props
    const optionsI = ["A", "B", "C", "D", "E", "F"]
    const [a, setA] = useState({})
    const [score, setScore] = useState(0)
    const [tscore, setTScore] = useState(0)
    const [failedM, setFailedM] = useState("")
    const loc = document.location.href.replace(/\/+$/, "")
    const keysUrl = loc.split('/')
    const linkCode = keysUrl[4]
    const name = decodeURIComponent(keysUrl[6])
    useEffect(()=>{
        loadResult()
    },[])
    function isAssessmentOver(assessment) {
        let mbool = true
        if(assessment.createdOn !== undefined){
            var createdOn = new Date(assessment.createdOn);
            var now = new Date();
            createdOn.setMinutes(createdOn.getMinutes() + assessment.duration);
            mbool = now >= createdOn
        }
    
        return assessment.status === "completed" || mbool ;
    }      
    function loadResult(){
        axios.post(API_ENDPOINT+'assessment-result', {linkCode, name}).then(res=>{
            let d = res.data
            console.log(d)
            if(d.success){
                let an = d.message
                setA(an)

                if(isAssessmentOver(an) && an.config.allowReport){
                    setShowDownload(true)
                }else{
                    setShowDownload(false)
                }
                let t = an.answers.length
                let s = an.answers.filter(c=>isCorrect(c.options, c.response))
                let sc = s.length

                setScore(sc)
                setTScore(t)
            }else{
                setFailedM(d.message)
            }
        })
    }
    function isCorrect(os, r){
        let ind = os.findIndex(o=>o.isCorrect)
        return optionsI[ind] === r
    }     
    return(
        <div ref={ref}>
            <div className="user-response">
                {Object.keys(a).length>0?
                isAssessmentOver(a)?  
                a.config.previewCorrect?
                <div>
                    <div className="user-response-header">
                        <img src={applogo}  style={{height: '100px', alignSelf: 'center'}}/>
                        <div className="ur-atitle">{a.title}</div>
                        <div className="ur-details">
                            <center><img src={aprofile} style={{height: '90px'}}/>
                            <div style={{fontSize: 15, color: '#444', marginTop: 8}}>{a.name}</div>
                            <div style={{display: 'flex', color: 'green', justifyContent: 'center'}}>
                                <div style={{alignSelf: 'center'}}>Your Score:</div>
                                <div style={{fontSize: 30, marginLeft: 8}}>{Math.round((parseInt(score)/parseInt(tscore))*100)}%</div>
                            </div>
                            </center>
                        </div>
                    </div>
                    <div className="ur-content">
                    <div className="ur-label-action">
                        <h2 style={{flex: 1}}>Answer Sheet</h2>        
                    </div>
                    {a.answers.map(b=>
                        <AnswerBox assessment={a} answer={b} />
                    )}
                    </div>
                </div>
                :
                <div style={{fontWeight: 600, margin: '20px auto', maxWidth: '1000px'}}>
                    <div className="user-response-header">
                        <img src={applogo}  style={{height: '64px', alignSelf: 'center'}}/>
                        <div className="ur-atitle">{a.title}</div>
                        <div className="ur-details">
                            <center><img src={aprofile} style={{height: '90px'}}/>
                            <div style={{fontSize: 15, color: '#444', marginTop: 8}}>{a.name}</div>
                            <div style={{display: 'flex', color: 'green', justifyContent: 'center'}}>
                                <div style={{alignSelf: 'center'}}>Your Score:</div>
                                <div style={{fontSize: 30, marginLeft: 8}}>{Math.round((parseInt(score)/parseInt(tscore))*100)}%</div>
                            </div>
                            </center>
                        </div>
                    </div>
                    <div className="ur-content">
                    <div className="ur-label-action">
                        <h2 style={{flex: 1}}>Answer Sheet</h2>        
                    </div>
                    {a.answers.map(b=>
                        <PreviewAnswerBox assessment={a} answer={b} />
                    )}
                    </div>
                    
                </div> 
                :
                <div style={{fontWeight: 600, margin: '20px auto', maxWidth: '800px', textAlign: 'center'}}>
                    <div className="user-response-header">
                        <img src={applogo}  style={{height: '64px', alignSelf: 'center'}}/>
                        <div className="ur-atitle">{a.title}</div>
                        {/* <div className="ur-details">
                            <center><img src={aprofile} style={{height: '90px'}}/>
                            <div style={{fontSize: 15, color: '#444', marginTop: 8}}>{a.name}</div>
                            <div style={{display: 'flex', color: 'green', justifyContent: 'center'}}>
                                <div style={{alignSelf: 'center'}}>Your Score:</div>
                                <div style={{fontSize: 30, marginLeft: 8}}>{Math.round((parseInt(score)/parseInt(tscore))*100)}%</div>
                            </div>
                            </center>
                        </div> */}
                    </div>

                        <img src={aprofile} style={{height: '100px', marginTop: 12}}/>
                        <div style={{fontSize: 17, fontWeight: 600, color: '#444', marginTop: 8}}>{a.name}</div>
                        <div style={{display: 'flex', color: 'green', justifyContent: 'center'}}>
                            <div style={{alignSelf: 'center'}}>Your Score:</div>
                            <div style={{fontSize: 30, marginLeft: 8}}>{Math.round((parseInt(score)/parseInt(tscore))*100)}%</div>
                        </div>
                 
                 <div style={{fontWeight: 500, fontSize: '18px'}}>{
                    `Please wait for the trainer to end assessment for the detailed report`
                 }</div>
                </div>:
                <div>{failedM===""?`Loading...`:failedM}</div>
                }
            </div>
        </div>
    )
})
export default Response