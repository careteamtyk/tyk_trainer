import appLogo from '../../assets/images/applogo.png'
import appIcon from '../../assets/svgs/appIcon.svg'
import './widget.css'
const LeftMenuLogo = (props)=>{
    const logoClick = ()=>{
        document.location.href = "/trainer"
    }
    return(
        <>
       {props.collapse?<img onClick={logoClick} className='left-menu-logo' src={appIcon} alt="App Icon"/>:<img onClick={logoClick} className='left-menu-logo' src={appLogo} alt="App Logo"/>}
        </>
    )
}
export default LeftMenuLogo