import React from 'react';
import './planWidget.css'
import {Button} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { RUPEE_SYMBOL } from '../../constants/constants';
import './TopupComponent.css'
import { calculateMarkedPrice } from '../../utilities/utility';
const TopupComponent = (props) => {
    const {topups, topup, si, onTopup} = props
    console.log(si, topups.length, si>1 && si<(topups.length-1))
    const price = calculateMarkedPrice(topup.price, topup.discount)
    const cstyle={
        backgroundColor: topup.color,
        color: 'rgb(254 246 180)',
        marginTop: si>=1 && si<topups.length? '16px':'0px'
    }
    return (
        <div style={cstyle} className='topup-comp'>
            <div>Get an AddOn of assessments</div>
            <div style={{display: 'flex'}}>
                <div style={{flex: 1}}>
                    <div style={{color: 'white', fontSize: '28px', fontWeight: 'bold'}}>up to {topup.count}</div>
                    <div style={{display: 'flex'}}>
                        <div style={{textDecoration: 'line-through'}}>{RUPEE_SYMBOL}{price}</div>
                        <div style={{marginLeft: '8px'}}>{RUPEE_SYMBOL}{topup.price}</div>
                    </div>
                </div>
                <div style={{alignSelf: 'center'}}>
                <Button onClick={()=>onTopup(topup.price, topup.count)} variant="outlined" endIcon={<ArrowForwardIcon/>}>Buy Now</Button>
                </div>
            </div>
        </div>
    );
};

export default TopupComponent;