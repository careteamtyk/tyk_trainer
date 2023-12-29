import MenuIcon from '@mui/icons-material/Menu';
import ListIcon from '@mui/icons-material/List';
import { useState } from 'react';
const RatulMenuIcon = (props)=>{
    const [open, setOpen] = useState(props.collapse)

    const onClick = (event)=>{
        setOpen(!open)
        props.setCollapse(!open)
    }
    return(
        <div onClick={onClick} className='rd_menu_icon'>
            {open?<ListIcon />:<MenuIcon />}
        </div>
    )
}
export default RatulMenuIcon