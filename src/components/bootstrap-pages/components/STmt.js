import { LoadingButton } from '@mui/lab'
import { Button, IconButton } from '@mui/material'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { MockTestA } from '../../../utilities/utility'
import MyModal from '../../widgets/myModal/myModal'
import EnterName from './EnterName'
import './STmt.css'
const STmt = (props)=>{
    const [showModal, setShowModal] = useState(false)
    const {asm} = props
    let numQns = new MockTestA(...asm.questions).sum('numQns')
    const showName = ()=>{
        setShowModal(!showModal)
    }
    return(
        <div className='st-mt'>
            <MyModal showHeader={false} showModal={showModal} setShowModal={setShowModal} mWidth='500px' modalC={<EnterName close={showName} asm={{...asm, numQns}}/>}/>
            <div style={{
                flex: 0.4, 
                backgroundImage: `url(${asm.banner})`, 
                backgroundColor: '#eee', 
                backgroundRepeat: 'no-repeat', 
                backgroundPosition: 'center'
                }}>
            </div>
            <div style={{flex: 0.6, paddingLeft: '8px'}}>
                <div>
                <div style={{fontSize: '18px'}}>{asm.title}</div>
                <div style={{fontSize: '14px', color: '#666'}}><span style={{color: '#555'}}>{asm.category}</span> &#62; <span>{asm.subCategory}</span></div>
                </div>
                <div>{numQns} Questions</div>
                <LoadingButton onClick={showName} size='small' variant='outlined'>Start Now</LoadingButton>
                {/* <NavLink style={{color: 'blue', fontSize: '17px'}} to={'/mock-test/'+asm.linkCode}> <div>Start Now</div></NavLink> */}
            </div>
        </div>
    )
}
export default STmt