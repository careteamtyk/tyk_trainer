import { CircularProgress } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { API_ENDPOINT } from '../../../constants/constants'
import './STCategories.css'
import STCatItem from './STCatItem'
const STCategories = (props)=>{
    const {onSelect} = props
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    


    useEffect(()=>{
      loadCourses()
    }, [])
    function loadCourses(){
      setLoading(true)
      axios.get(API_ENDPOINT+'get-categories').then(res=>{
          let d = res.data
          setLoading(false)
          if(d.success){
            setCourses(d.message)
          }else{
            toast(d.message)
          }
      })
    }
    return(
        <div className='st-categories'>
        {
              loading?
              <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
              <CircularProgress />
            </div>:
            courses.length > 0?

                  courses.map((value, index) => ( 
                    <STCatItem onSelect={onSelect} key={index} cat={value}/>
                   )):

              <div style={{fontWeight: '600', fontSize: '24px', color: 'rgb(158 154 154)', opacity: '0.6'}}>
              No MockTest found yet 
              </div>
            }
        </div>
    )
}
export default STCategories