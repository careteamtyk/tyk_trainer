
import footerLogoWhite from '../../assets/svgs/tykhere-logo-white.svg'
import IconLabel from '../widgets/iconLabel';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import './footer.css'

const FooterBlue = ()=>{
    const logoClick = ()=>{
        document.location.href = "/"
    }
    return(
        <div className='footer_blue'>
        <div className='footer_c'>
        <img style={{cursor: 'pointer'}} onClick={logoClick} id="icon" src = {footerLogoWhite} alt=""/>
        
        <a href='mailto:careteam.tyk@gmail.com'><div id="email" style={{cursor: 'pointer'}}>  
            <IconLabel isMUI={true} icon={<MailOutlineIcon sx={{color: 'white', fontSize: 18}} />} font="Segoe UI" color="white"  label="careteam.tyk@gmail.com" is={24} ls={14} gap={6}  />
        </div></a>
        <div id="phone">  
            <IconLabel isMUI={true} icon={<PhoneIcon sx={{color: 'white', fontSize: 18}} />} font="Segoe UI" color="white"  label="+919980517031" is={24} ls={14} gap={6}  />
        </div>
        <div id="social">
            <div style={{alignSelf: 'center', cursor: 'pointer'}}><FacebookIcon sx={{color: 'white', fontSize: '24px', border: '1px solid white', borderRadius: '50%', padding: '2px'}} /></div>
            <div style={{alignSelf: 'center', marginLeft: 10, marginRight: 10, cursor: 'pointer'}}><InstagramIcon sx={{color: 'white', fontSize: '24px', border: '1px solid white', borderRadius: '50%', padding: '2px'}}/></div>
            <div style={{alignSelf: 'center', cursor: 'pointer'}}><TwitterIcon sx={{color: 'white', fontSize: '24px', border: '1px solid white', borderRadius: '50%', padding: '2px'}}/></div>
        </div>
        </div>
        </div>
    )
}
export default FooterBlue;