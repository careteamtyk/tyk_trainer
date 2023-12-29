import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { API_ENDPOINT } from '../../constants/constants'
import CustomCircularP from '../widgets/customCircularP'
import './resetPassword.css'
const ResetPassword = ()=>{
    const loc = document.location.href.replace(/\/+$/, "")
    const keysUrl = loc.split('/')
    const linkCode = keysUrl[4]
    const [loading, setLoading] = useState(false)
    const [validLink, setValidLink] = useState(true)
    const [reset, setReset] = useState(false)
    const [pwd, setPwd] = useState("")
    const [cPwd, setCPwd] = useState("")
    useEffect(()=>{
        verifyResetLink()
    }, [])


    const resetPassword = ()=>{
        if(pwd !== "" && cPwd !==""){
            if(pwd === cPwd){
                setLoading(true)
                axios.post(API_ENDPOINT+'reset-password', {linkCode: linkCode, password: pwd}).then(res=>{
                    setLoading(false)
                    let d = res.data
                    if(d.success){
                        setReset(true)
                        toast(d.message)
                    }
                })
            }else{
                toast("Passwords dont match!!")
            }
        }else{
            toast("Password fields cannot be empty")
        }
    }

    function verifyResetLink(){
        axios.post(API_ENDPOINT+'verify-reset-link', {linkCode: linkCode}).then(res=>{
            setLoading(false)
            let d = res.data
            if(d.success){
                setValidLink(true)
            }else{
                setValidLink(false)
            }
        })
    }

    return(
        <div className='reset-password-c'>
            <CustomCircularP show={loading}/>
        {validLink?
            <>
                <div style={{fontWeight: 600, fontSize: '22px', color: '#555'}}>Reset Your Password</div>
                <div>
                    <TextField disabled={reset}  value={pwd} onChange={(e)=>setPwd(e.target.value)} type='password' variant='standard' label='Enter Password' fullWidth size='small' margin='normal'/>
                    <TextField disabled={reset}  value={cPwd} onChange={(e)=>setCPwd(e.target.value)} type='password' variant='standard' label='Re-Enter Password' fullWidth size='small' margin='normal'/>
                    <Button disabled={reset}  onClick={resetPassword} variant='contained' fullWidth>Reset</Button>
                    
                    {reset?
                        <div>
                        <div style={{color: 'green', fontSize: '17px', marginTop: '16px'}}>
                       
                            Password reset Successfully!
                            <a style={{fontSize: '18px', marginLeft: '16px'}} href="/login">Go to Login</a>
                            </div>
                      
                    </div>:''}
                </div>
                </>:<div>
                    <div style={{color: 'green', fontSize: '24px', textAlign: 'center'}}>
                        Invalid Link!!
                    </div>
                    </div>
        }
        </div>
    )
}
export default ResetPassword