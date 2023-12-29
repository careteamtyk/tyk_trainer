import './footer.css'
const FooterBlack = ()=>{
    return(
        <div className="footer_black">
            <div className='footer_c'>
                <div id="left">
                    <div><a style={{color: 'white'}} href='/'>Home</a></div>
                    <div><a style={{color: 'white'}} href='/about-us'>About Us</a></div>
                    <div><a style={{color: 'white'}} href='/terms-conditions'>Terms and Conditions</a></div>
                    <div><a style={{color: 'white'}} href='/privacy-policy'>Privacy Policy</a></div>
                    <div><a style={{color: 'white'}} href='/contact-us'>Contact Us</a></div>
                </div>
                <div id="right">© Copyrights 2023</div>
            </div>
        </div>
    )
}
export default FooterBlack