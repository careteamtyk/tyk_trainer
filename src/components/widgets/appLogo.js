import './widget.css'
import appLogo from '../../assets/svgs/applogo.svg'
//import appLogo1 from '../../assets/images/applogo.png'
import appIcon from '../../assets/svgs/appIcon.svg'
const AppLogo = ()=>{

const goToHome = ()=>{
    document.location.href = '/'
}

    return(<div onClick={goToHome} className='app_logo'>
        <img id="full_logo" src={appLogo} alt="App Logo"/>
        <img id="partial_logo" src={appIcon} alt="App Icon"/>
    </div>)
}
export default AppLogo