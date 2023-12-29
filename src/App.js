import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import EnterName from './components/assessment/enterName';
import Live from './components/assessment/live/live';
import MyResult from './components/assessment/myResult';
import Response from './components/assessment/response';
import Login from './components/auths/login';
import Register from './components/auths/register';
import Trainer from './components/dashboard/trainer';
import Home from './components/home/home';
import ImagesUpload from './components/imagesLibrary/imagesUpload';
import Reader from './components/reader/reader';
import NotFound from './NotFound';
import PrivatePath from './privtatePath';
import WelcomeTrainer from './components/bootstrap-pages/welcomeTrainer';
import { MockTest } from './components/bootstrap-pages/components/MockTest';
import AnswerSheet from './components/assessment/answerSheet';
import Privacy from './components/terms/privacy';
import Terms from './components/terms/terms';
import GenerateResetLink from './components/auths/generateResetLink';
import ResetPassword from './components/auths/resetPassword';
import MockIntro from './components/mock-test/MockIntro';
import 'react-phone-number-input/style.css'
import { LibraryAdd } from '@mui/icons-material';
import ScheduledAssessment from './components/assessment/scheduled/ScheduledAssessment';
import ALive from './components/assessment/live/ALive';
import ContactUs from './components/terms/contactus';
import AboutUs from './components/terms/aboutus';
import MockLive from './components/bootstrap-pages/components/MockLive';
import ProtectLive from './protectLive';
import 'react-circular-progressbar/dist/styles.css';
function App() {
  return (
    <BrowserRouter>
    <ToastContainer autoClose={1500}/>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/welcome" element={<WelcomeTrainer />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path='/privacy-policy' element={<Privacy />} />
      <Route path='/terms-conditions' element={<Terms />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reader" element={<Reader />} />
      <Route path='/mock-test' element={<MockTest />} />
      <Route path='/mock-test/:id' element={<MockIntro />} />
      <Route path='/mock-live/:id/:name' element={<MockLive />} />
      <Route path="/images-library" element={<ImagesUpload />} />
      <Route path='/generate-reset-link' element={<GenerateResetLink />} />
      <Route path='/reset-password/:code' element={<ResetPassword />} />
      
      <Route path="/assessment/:id/" element={<EnterName />} />
      <Route path='/assessment/:id/:name' element={<Live />} />
      <Route path='/assessment/live/:code' element = {<ALive />} />
      <Route path='/assessment/scheduled/:code' element = {<ScheduledAssessment />} />
      <Route path='/assessment/:id/answer-sheet/:name' element={<AnswerSheet />} />
      <Route path='/assessment/:id/:name/result' element={<MyResult />} />

      <Route exact path="/trainer" element={<PrivatePath> <Trainer /></PrivatePath>} />
      <Route exact path="/trainer/trainer-profile" element={<PrivatePath> <Trainer /></PrivatePath>} />
      <Route exact path="/trainer/:v" element={<PrivatePath> <Trainer /></PrivatePath>} />
      <Route exact path="/trainer/:v/draft" element={<PrivatePath> <Trainer /></PrivatePath>} />
      <Route exact path="/trainer/:v/recreate/:c" element={<PrivatePath> <Trainer /></PrivatePath>} />
      <Route exact path="/trainer/live-assessment/:c" element={<PrivatePath> <Trainer /></PrivatePath>} />
      <Route exact path="/trainer/report/:c" element={<PrivatePath> <Trainer /></PrivatePath>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
