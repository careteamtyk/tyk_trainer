import { Button } from '@mui/material'
import {useState} from 'react'
import './sModal.css'
import Ticker from '../widgets/anims/ticker'
import {toast} from 'react-toastify'
import appLogo from '../../assets/images/applogo.png'
import { API_ENDPOINT, RAZORPAY_KEY_ID, HOSTNAME } from '../../constants/constants'
import axios from 'axios'
import { getHeader, getName, getPhone } from '../../utilities/utility'
const MakePayment = ({showModal, setShowModal, price=0, num=0, name=""})=>{
    const [showTicker, setShowTicker] = useState(false)
    
    function loadScript(src) {
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
          document.body.appendChild(script);
        });
      }
    
      async function displayRazorpay(pamount, anum, pname) {
        const res = await loadScript(
          'https://checkout.razorpay.com/v1/checkout.js'
        );
    
        if (!res) {
          toast.error('Razorpay SDK failed to load. Are you online?');
          return;
        }
        const result = await axios.post(API_ENDPOINT+'create-rzp-order',{amount: pamount, assessmentCount: anum, plan: pname,  currency: "INR", receipt: `Plan purchase: ${pname}`}, getHeader());
        if (!result) {
          toast.error('Server error. Are you online?');
          return;
        }
        const { amount, id: order_id, currency } = result.data;    
        const options = {
          key: RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
          amount: amount,
          currency: currency,
          name: 'Tykhere',
          description: `Plan purchase`,
          image: HOSTNAME+'logo512.png',
          order_id: order_id,
          handler: async function (response) {
            const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              assessmentCount: anum,
              planName: pname
            }
            const result = await axios.post(API_ENDPOINT+'payment-success', data, getHeader());
            if(result.data.success){
                setShowTicker(!showTicker)
            }else{
                toast.success(result.message)
            }
            setShowTicker(!showTicker)
          },
          prefill: {
            name: getName(),
            email: "",
            contact: getPhone(),
          },
          notes: {
            address: 'Example Corporate Office',
          },
          theme: {
            color: '#61dafb',
          },
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }    

    const onClick = ()=>{
       displayRazorpay(price, num, name)
    }
    const onSuccess = ()=>{
        setShowTicker(false)
        setShowModal(false)
        toast.success("Payment Successfully done!")
        window.location.reload()

    }
    return(
        <div className="make-payment">
        <div className='mph'>
            Subscribe to <span>{name}</span>
        </div>
        <div className='mpd'>
            Create and manage assessments upto <span>{num}</span>
        </div>
        <div className='mpv'>
            Rs. {price}
        </div>
        <div style={{display: 'table', marginLeft: 'auto', marginRight: 'auto', marginTop: 16}}>
        {showTicker?<Ticker func={onSuccess}  />: <Button onClick={onClick} variant='contained'>Proceed to Payment</Button>}
        </div>
        <div className='mpa'>
            Clicking on Proceed will allow you to buy the Subscription through online Payment system
        </div>
    </div>
    )
}
export default MakePayment