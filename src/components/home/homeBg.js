import './home.css'
import playTest from '../../assets/svgs/playtest.svg'
import bgImg from '../../assets/images/featured-bg.png'
const HomeBg = ()=>{
    return(
        <div className='home_bg'>
           <img className='img1' src={playTest} alt=""/>
           <img className='img2' src={bgImg} alt=""/>
        </div>
    )

}
export default HomeBg