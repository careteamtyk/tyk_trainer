import goldIcon from '../../assets/svgs/goldIcon.svg'
import './premiumCard.css'
import axios from 'axios'
import { ShimmerButton, ShimmerCircularImage } from "react-shimmer-effects";
import { API_ENDPOINT, HEADER_TOKEN } from '../../constants/constants';
import { useEffect, useState } from 'react';
import ConstructionIcon from '@mui/icons-material/Construction';
import GridGoldenratioIcon from '@mui/icons-material/GridGoldenratio';
import DiamondIcon from '@mui/icons-material/Diamond';
import FlagIcon from '@mui/icons-material/Flag';
import BoltIcon from '@mui/icons-material/Bolt';
import { deleteToken, getHeader } from '../../utilities/utility';
const PremiumCard  = ({planData, setPlanData})=>{
    const [dataLoaded, setDataLoaded] = useState(false)
    useEffect(()=>{
        //loadData()
        loadMyPlan()
    }, [])
    const loadData = ()=>{
        setDataLoaded(false)
        axios.post(API_ENDPOINT+'trainer/current-plan', {}, HEADER_TOKEN).then(res=>{
            setDataLoaded(true)
            let d = res.data
            if(d.success){
                let datao = d.message
                let plan = datao.plan
                let date = new Date(plan.createdOn)
                let now = new Date()
                let daysdiff = (now.getTime()-date.getTime())/(1000 * 60 * 60 * 24)
                let daysremaining = parseInt(plan.validity)-parseInt(daysdiff)
                let np = {name: plan.name, usageStatus: plan.used+"/"+plan.assessmentCount, validityStatus: daysremaining>=0?daysremaining+" days remaining":"Expired", color: plan.color} 
                setPlanData(np)
            }else{
                if(!d.auth){
                    deleteToken()
                    document.location.href='/login'
                }
            }
        })
    }
    function loadMyPlan(){
        setDataLoaded(false)
        axios.get(API_ENDPOINT+'trainer/get-my-plan', getHeader()).then(res=>{
            setDataLoaded(true)
            let d = res.data
            setPlanData(d.message)
        })
    }
    return(
        <div className='premium-card'>
           {dataLoaded && planData?<>
            <div style={{display: 'flex', width: '100%'}}>
                <div style={{flex: 1, fontWeight: 600, fontSize: '19px', color: planData.color}}>{planData.name}</div><GridGoldenratioIcon sx={{color: planData.color}}/>
            </div>
            <div style={{ marginTop: 8}}>Plan Usage: <span style={{color: planData.color}}>{planData.used}/{planData.count}</span></div>
            <div style={{ marginTop: 8, fontSize: '14px'}}>Validiy Status: <span style={{color: planData.color}}>{planData.name === 'Trial Plan'? (planData.status !=='Active'? `Expired ${14 - planData.remainingDays} days ago`:`${14 - planData.remainingDays} days remaining`): (planData.status!=='Active'?planData.status:`${planData.remainingDays} days remaining`)}</span></div>
            {planData.name !== "Premium" &&
            <a style={{textDecoration: 'none'}} href="/trainer/subscription"><div className='plan-upgrade-btn'>Upgrade Account</div></a>
            }
            </>:
          <div> 
          <div style={{display: 'flex'}}><ShimmerButton size="md"/>
          <ShimmerCircularImage size={48}/>
          </div>
          <ShimmerButton size="md"/>
          </div>}
        </div>
    )
}
export default PremiumCard