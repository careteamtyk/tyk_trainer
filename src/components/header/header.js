import './header.css'
import Button from '../widgets/rdButton';
import StartAssessment from '../widgets/startButton';
import AppLogo from '../widgets/appLogo';
const Header = ()=>{
    const handleSignIn = ()=>{
        document.location.href = "/login"
    }
    return(<div className='home_header'>
        <div className='logo_container'>
        <AppLogo />
        </div>
        <div className='action_container'>
            <Button onClick = {handleSignIn} value="Sign In"/>
            <StartAssessment />
        </div>    
    </div>)
}
export default Header;