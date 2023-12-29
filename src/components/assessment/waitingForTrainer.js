import { useEffect, useState } from 'react';
import al from '../../assets/images/al.gif'
import {io} from 'socket.io-client'
import { API_ENDPOINT } from '../../constants/constants';
import userEvent from '@testing-library/user-event';
import {toast } from 'react-toastify';

import Live from './live/live';
import './assessment.css'
import gl from '../../assets/gifs/waitingAnim.gif'
import wft from '../../assets/images/wft.jpg'
import IntroHeader from '../widgets/introHeader';
import { getCandidateName, isCandidateExists } from '../../utilities/utility';
const WaitingForTrainer = ({setStarted, linkCode, socket, ainfo, setAinfo, onGoLive})=>{
    const WAITING = "waiting"
    useEffect(()=>{
        if(isCandidateExists()){
            let cn = getCandidateName()
             let d = {name: cn.name, status: WAITING, score: 0, linkCode: ainfo.linkCode, numAttempted: 0}
             socket.emit("joining", d)
             
             socket.on('start-'+linkCode, m=>{
                /*
                    START ASSESSMENT COMMAND
                */
               //document.location.href = '/assessment/live/'+linkCode
               onGoLive()
             })
        }
    }, [])
  
    return(<div style={{background: 'white', width: '100vw', height: '100vh', position: 'fixed'}}>
            <IntroHeader ainfo={ainfo}/>
            <div className='waiting-trainer'>   
                <div style={{flex: 0.5, display: 'flex', justifyContent: 'center', backgroundColor: 'white'}}>
                    <div style={{alignSelf: 'center'}}>
                    {/* <center><img src={al} alt="Loader"/></center> */}
                    <div className='animate-charcter' style={{margin: 20, color: 'rgb(13 85 157)', fontSize: '32px', fontWeight: 600, textAlign: 'center'}}>Waiting for trainer to Start Assessment</div>
                    </div>
                </div>
                <div style={{flex: 0.5, display: 'flex', justifyContent: 'center'}}>
                    <div style={{alignSelf: 'center'}}><img src={wft} alt="" style={{width: '100%', maxHeight: '90%'}}/></div>
                </div>
            </div>
        </div>
    )
}
export default WaitingForTrainer