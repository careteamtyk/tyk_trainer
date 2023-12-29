import './aFilter.css'
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from 'react';
const AFilter = ( {onFilter})=>{
    const [showList, setShowList] = useState(false)
    const [current, setCurrent] = useState("All")
    const options = ["All", "Completed", "Upcoming", "Draft"]
    const onSelect = (v)=>{
        if(v === "Draft"){
            document.location.href = "/trainer/create-assessment/draft"
        }else{
            setShowList(false)
            setCurrent(v)
            onFilter(v)
        }
    }
    return (
        <div className='a-filter'>
            <div style={{display: 'flex'}} onClick={()=>setShowList(!showList)}>
            <FilterListIcon />
            <div style={{alignSelf: 'center', marginLeft: '8px'}}>{current}</div>
            </div>

            <div className={showList?'a-filter-c':'a-filter-c hide'}>
                {
                    options.map((m, i)=><div onClick={()=>onSelect(m)} className='a-filter-i'>{m}</div>)
                }
            </div>
        </div>
    )
}
export default AFilter