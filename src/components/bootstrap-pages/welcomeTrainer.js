import Footer from '../footer/footer';
import Header from './components/Header';
import Home from './components/Home';
import './welcomeTrainer.css'
const WelcomeTrainer = ()=>{
    return(
        <div className='welcome-trainer'>
            <Header />
        <Home/>
      <Footer />
        </div>
    )
}
export default WelcomeTrainer