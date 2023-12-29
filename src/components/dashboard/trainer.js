import { Button } from '@mui/material'
import appLogo from '../../assets/images/applogo.png'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import './trainer.css'
import MenuButton from '../widgets/menuButton';
import MenuIcon from '@mui/icons-material/Widgets';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import SummarizeIcon from '@mui/icons-material/Summarize';
import LogoutIcon from '@mui/icons-material/Logout';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import PremiumCard from '../widgets/premiumCard';
import { deleteToken } from '../../utilities/utility';
import Dashboard from './dashboard';
import Header from './header';
import { useState } from 'react';
import {toast } from 'react-toastify';

import MyAssessments from './myAssessments';
import CreateAssessment from './createAssessment';
import CreateButton from '../widgets/createButton';
import LeftMenuLogo from '../widgets/leftMenuLogo';
import Footer from '../footer/footer';
import Report from './report';
import Documentation from './documentation';
import QuestionLibrary from './ql/questionLibrary';
import LiveAssessment from './liveAssessment';
import Subscription from '../subscription/subscription';
import AReport from '../report/aReport';
import Profile from '../profile/profile';
import { useNavigate } from 'react-router-dom';
const Trainer = ()=>{
  const loc = document.location.href.replace(/\/+$/, "")
  const keysUrl = loc.split('/')
  let tms = keysUrl[4]
  const a_code = tms===undefined?"my-dashboard":keysUrl[4]
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState(false)
  const [planData, setPlanData] = useState()
  const handleLogout = ()=>{
      deleteToken()
      document.location.href="/login"
  }
  const createAssessment = ()=>{
    if(planData){
      if(planData.status === "Active" && (planData.balance>0 || (planData.topup && planData.topup>0))){
        navigate('/trainer/create-assessment');
      }else{
        subscription()
      }
    }else{
      subscription()
    }
  }
  const myDashboard = ()=>{
    navigate("/trainer/my-dashboard")
  }
  const myAssessment = ()=>{
    navigate("/trainer/my-assessments")
  }
  const questionLibrary = ()=>{
    navigate("/trainer/question-library")
  }
  const reports = ()=>{
    navigate("/trainer/report")
  }
  const subscription = ()=>{
    navigate("/trainer/subscription")
  }
    return (<div className='trainer_dashboard'>
        <div className='left_menu_box'>
          <LeftMenuLogo collapse={collapse} />
          <div style={{marginTop: 16, marginLeft: 12, marginRight: 12}}>
          <CreateButton collapse={collapse} onClick={createAssessment} />
          </div>
          <MenuButton collapse={collapse} onClick={myDashboard} text="My Dashboard" MenuIcon = {DashboardCustomizeOutlinedIcon} active = {a_code==="my-dashboard"} />
          <MenuButton collapse={collapse} onClick={myAssessment} text="My Assessment" MenuIcon = {AssessmentOutlinedIcon} active = {a_code==="my-assessments"} />
          <MenuButton collapse={collapse} onClick={questionLibrary} text="Question Library" MenuIcon = {LibraryBooksOutlinedIcon} active = {a_code==="question-library"} />
          {/* <MenuButton collapse={collapse} onClick={reports} text="Reports" MenuIcon = {InsightsOutlinedIcon} active = {a_code==="report"} /> */}
          <MenuButton collapse={collapse} onClick={subscription} text="Subscription" MenuIcon = {TopicOutlinedIcon} active = {a_code==="subscription"} />
          <MenuButton collapse={collapse} onClick={handleLogout} text="Logout" MenuIcon = {LogoutIcon} />
          {collapse?'':<PremiumCard planData={planData} setPlanData={setPlanData} />}
        </div>
        <Header title={a_code} collapse={collapse} setCollapse={setCollapse}/>
      <div className='dashboard_content' style={{marginLeft: collapse?100:256}}>
     
      {a_code==="create-assessment"?<CreateAssessment  setCollapse={setCollapse}/>:    
      a_code==="my-dashboard"?<Dashboard planData={planData} />:
      a_code==="my-assessments"?<MyAssessments />:
      a_code==="trainer-profile"?<Profile />:
      a_code==="question-library"?<QuestionLibrary />:
      a_code==="report"?<AReport />:
      a_code==="subscription"?<Subscription planData={planData}/>:
      a_code==="live-assessment"?<LiveAssessment setCollapse={setCollapse} />:
      a_code==="subscription"?<Subscription />:
      <Dashboard />
      }

      </div>
    </div>)
}
export default Trainer