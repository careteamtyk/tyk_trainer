import axios from 'axios'
import { toast } from 'react-toastify'
import { API_ENDPOINT, HEADER_TOKEN } from '../../constants/constants';
import './startButton.css'
import CustomCircularP from './customCircularP'
import {useState} from 'react'
import { buttonColorYellow, purpleBgColor } from '../../utilities/themes';
const StartAssessment = ()=>{
    const [isL, setIsL] = useState()
    const cstyle={
        border: `1px solid ${purpleBgColor}`
    }
    const goToLive = ()=>{
        let v = document.getElementById("us_input").value
        if(v !== ""){
            setIsL(true)
            axios.post(API_ENDPOINT+'user/get-assessment-link', {code: v}, HEADER_TOKEN).then(res=>{
                setIsL(false)
                let d = res.data
                if(d.success){
                    document.location.href = "/assessment/"+d.message.linkCode
                }else{
                    toast(d.message)
                }
            })
        }else{
            toast("Please Enter Assessment Code")
        }
    }
    return(
        <div style={cstyle} className='start_assessment'>
              {<CustomCircularP show={isL} />}
            <div id="input_c"><input id="us_input"  type="text" placeholder="Enter Code..."/></div>
            <button style={{backgroundColor: purpleBgColor}} onClick={goToLive} id="us_button">Start Assessment</button>
        </div>
    )
}
export default StartAssessment