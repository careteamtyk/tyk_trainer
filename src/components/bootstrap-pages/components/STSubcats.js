import { CircularProgress } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { API_ENDPOINT } from '../../../constants/constants'
import STSubcat from './STSubcat'
import './STSubcats.css'
const STSubcats = (props)=>{
    const {cat, onSelect} = props
    const [cats, setCats] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        if(cat !== ""){
            loadCats()
        }
    }, [cat])
    function loadCats(){
        setLoading(true)
        axios.post(API_ENDPOINT+'get-sub-cats', {cat: cat}).then(res=>{
            setLoading(false)
            let d = res.data
            if(d.success){
                setCats(d.message)                
            }else{
                toast(d.message)
            }
        })
    }
    return(
        <div className="st-sub-cats">
{
              loading?
              <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
              <CircularProgress />
            </div>:
            cats.length > 0?

                  cats.map((ct, i)=>(
                    <STSubcat onSelect={onSelect} subcat={ct} key = {i}/>
                )):

              <div style={{fontWeight: '600', fontSize: '24px', color: 'rgb(158 154 154)', opacity: '0.6'}}>
              No MockTest found yet 
              </div>
            }

        </div>
    )
}
export default STSubcats