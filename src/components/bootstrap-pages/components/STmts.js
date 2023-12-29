import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { API_ENDPOINT } from '../../../constants/constants'
import STmt from './STmt'
import './STmts.css'
const STmts = (props)=>{ 
    const {cat, subcat} = props
    const navigate = useNavigate()
    const [assessments, setAssessments] = useState([])
    useEffect(()=>{
        if(cat !== "" && subcat !== ""){
            loadAsm()
        }
    }, [cat, subcat])
    function loadAsm(){
        console.log(cat, subcat)
        axios.post(API_ENDPOINT+'get-st-assessments', {cat: cat, subcat: subcat}).then(res=>{
            let d = res.data
            if(d.success){
                setAssessments(d.message)
            }else{
                toast(d.message)
            }
        })
    }
    return(
        <div className='st-mts'>
            {
                assessments.map((asm, i)=>(
                    <STmt asm={asm} key={i} />
                ))
            }
        </div>
    )
}
export default STmts