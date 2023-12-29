import { Button } from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Ticker from '../widgets/anims/ticker'

import { API_ENDPOINT, RAZORPAY_KEY_ID, HOSTNAME, RUPEE_SYMBOL } from '../../constants/constants'
import axios from 'axios'
import { getHeader, getName, getPhone } from '../../utilities/utility'

import './sModal.css'
const TopUpPurchase = (props)=>{
    const {showModal, setShowModal, tamount=300, tnum=50} = props
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
        const result = await axios.post(API_ENDPOINT+'create-rzp-order',
          {
            amount: pamount, 
            assessmentCount: anum,
            planName: pname,
            topUp: true, 
            currency: "INR", 
            receipt: "Tykhere Receipt"
          }, getHeader());
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
          description: `Topup Purchase`,
          image: HOSTNAME+'logo512.png',
          order_id: order_id,
          handler: async function (response) {
            const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              assessmentCount: anum,
              planName: pname,
              topUp: true
            }
            const result = await axios.post(API_ENDPOINT+'payment-success', data, getHeader());
            if(result.data.success){
                setShowTicker(!showTicker)
            }else{
                toast(result.message)
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
        displayRazorpay(tamount, tnum, "")
        //setShowTicker(!showTicker)
    }
    const onSuccess = ()=>{
        setShowTicker(false)
        setShowModal(false)
        toast("Payment Successfully done!")
        window.location.reload()

    }



    return(
        <div className="make-payment">
            <div className='mph'>
               Topup
            </div>
            <div className='mpd'>
                Get an AddOn of assessments upto <span>{tnum}</span>
            </div>
            <div className='mpi'>
                Unused Topup assessments will be added to succeeding month
            </div>
            <div className='mpv'>
                {RUPEE_SYMBOL}{tamount}/-
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
export default TopUpPurchase