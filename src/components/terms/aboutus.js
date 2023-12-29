import { AbcOutlined } from "@mui/icons-material"
import Footer from "../footer/footer"
import Header from "../header/header"
import './aboutus.css'
import myImage1 from '../../assets/images/about_us.png';
import myImage2 from '../../assets/images/about_us_1.png';

const AboutUs = ()=>{
    return(
        <div>
            <div className="about-us">
                <Header />
                <div className="first-about-us">
                    <div className="first-about-form">
                        <h2><strong>About Us</strong></h2>
                        <p>In This Day And Age, Evaluating An Individual To Understand His Competency  Is Tougher Than The Entire Training Process. Competency Of An Individual/Student Plays An Important Role In Business, Training And Educational Sector. To Make The Process Easier And To Reduce The Time Taken For Testing Knowledge We Came Up With Tykhere Application. We Will Help You To Step Up From The Old Ways Of Giving Paper Assessments And Going Green Completely, Making Assessment Creation Easy, Fun And Engaging.</p>
                    </div>

                    <div className="first-about-form2">
                        <img style={{width: "400px"}} src={myImage1}/>
                    </div>
                </div>

                <div className="second-about-us">
                    <div className="second-about-form">
                        <img style={{width: "400px"}} src={myImage2}/>
                    </div>

                    <div className="second-about-form2">
                        <h2><strong>Vision</strong></h2>
                            <p>To be a industry leading company offering unrivalled, high quality and easy assessment evaluation platform and solutions for learning.</p>

                        <h2><strong>Mission</strong></h2>
                            <p>To deliver exceptional platform experience that will meet and exceed our user expectations.</p>    
                    </div>

                </div>
         
        </div>
        <br /><br />
            <Footer />
        </div>
    )
}
export default AboutUs