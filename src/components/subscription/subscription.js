import axios from 'axios'
import { useEffect, useState } from 'react'
import { API_ENDPOINT, HEADER_TOKEN } from '../../constants/constants'
import MyModal from '../widgets/myModal/myModal'
import MakePayment from './makePyament'
import PlanComponent from './planComponent'
import PlanWidget from './planWidget'
import './subscription.css'
import TopupComponent from './TopupComponent'
import TopUpPurchase from './topUpPurchase'
import ContactUs from './ContactUs'
import { getDateFormat, getHeader } from '../../utilities/utility'
const Subscription = ({planData})=>{
    const [cp, setCp] = useState("")
    const [pa, setPa] = useState(["---", "---", "---", "---"])
    const [pm, setPm] = useState("---", "---", "---")
    const [showModal, setShowModal] = useState(false)
    const [modalC, setModalC] = useState(<MakePayment />)
    const [transactions, setTransactions] = useState([])
    const [plans, setPlans] = useState([])
    const [topups, setTopups] = useState([])
   
    // const plans = [
    //                     {
    //                         name: "Basic",
    //                         price: 899,
    //                         count: 30,
    //                         limit: 60,
    //                         discount: 20,
    //                         color: {bg: "rgb(248, 14, 38)", text: "white"},
    //                     },
    //                     {
    //                         name: "Standard",
    //                         price: 1399,
    //                         count: 60,
    //                         limit: 80,
    //                         discount: 20,
    //                         color: {bg: "rgb(255, 179, 0)", text: "white"},
    //                     },
    //                     {
    //                         name: "Premium",
    //                         price: 2199,
    //                         count: 120,
    //                         limit: 100,
    //                         discount: 20,
    //                         color: {bg: "rgb(72, 133, 255)", text: "white"},
    //                     }  
    //     ]

    // const topups = [
    //     {
    //         count: 50,
    //         price: 300,
    //         discount: 20,
    //         color: {bg: 'rgb(255, 148, 0)'}
    //     },
    //     {
    //         count: 100,
    //         price: 500,
    //         discount: 20,
    //         color: {bg: 'rgb(61, 15, 253)'}
    //     },
    //     {
    //         count: 150,
    //         price: 600,
    //         discount: 20,
    //         color: {bg: 'rgb(252, 47, 60)'}
    //     }
    // ]

        useEffect(()=>{
            loadHistory()
            loadPlans()
            loadTopups()
        }, [])
    function loadPlan(){
        axios.post(API_ENDPOINT+'trainer/current-plan', {}, HEADER_TOKEN).then(res=>{
            let d = res.data
            if(d.success){
                let datao = d.message
                let plan = datao.plan
                let date = new Date(plan.createdOn)
                let remainingCount = plan.assessmentCount - plan.used
                let now = new Date()
                let daysdiff = (now.getTime()-date.getTime())/(1000 * 60 * 60 * 24)
                let daysremaining = parseInt(plan.validity)-parseInt(daysdiff)
                setPa([plan.name, plan.assessmentCount, remainingCount, daysremaining])
            }
        })
    }
    function loadPlans(){
        axios.get(API_ENDPOINT+'get-subscription-plans', getHeader()).then(res=>{
            let d = res.data
            if(d.success){
                setPlans(d.message)
            }
        })
    }
    function loadTopups(){
        axios.get(API_ENDPOINT+'get-topup-plans', getHeader()).then(res=>{
            let d = res.data
            if(d.success){
                console.log(d)
                setTopups(d.message)
            }
        })
    }
    
    function loadHistory(){
        axios.get(API_ENDPOINT+'trainer/transaction-history', getHeader()).then(res=>{
            let d = res.data
            if(d.success){
                setTransactions(d.message)
            }
        })
    }
    const onSelect=(plan)=>{
        setCp(plan.name)
    }
    const onProceed = (plan)=>{
        setModalC(<MakePayment showModal={showModal} setShowModal={setShowModal} name={plan.name} num={plan.count} price={plan.price}/>)
        setShowModal(!showModal)
    }
    const onTopup = (amount, num)=>{
        setModalC(<TopUpPurchase tamount={amount} tnum={num} showModal={showModal} setShowModal={setShowModal} />)
        setShowModal(!showModal)
    }
    return(
        <div className='subscription-page'>
            <MyModal mWidth={"600px"} showModal={showModal} setShowModal={setShowModal} showHeader={false} modalC={modalC} />
            
             <div style={{display: 'flex', padding: 6, marginBottom: 24}}>
                 <div style={{flex: 0.6}}>
                    <div style={{fontWeight: 600, fontSize: 22, color: '#3634be'}}>Subscription Details</div>
                    <div style={{fontWeight: 500, fontSize: 17, color: '#777'}}>
                        
                        You are currently subscribed to {planData && planData.name}. 
                        
                        { planData && planData.name === 'Trial Plan'? `Please consider to Upgrade now`:''}
                        
                        </div>
                 </div>
                 <div style={{alignSelf: 'center'}}>
                     <span style={{padding: '4px 16px', borderRadius: '16px', background: '#3634be', color: 'white'}}>{planData && planData.status}</span>
                 </div>
             </div>
            <div className='subscription-c'>
                <div className='s-plan-c'> 
                    <PlanComponent  planData={planData}/>
                    <div style={{position: 'relative', marginTop: '32px', marginBottom: '16px'}}>
                    {
                        plans.map(p=>
                            <PlanWidget  
                                onProceed={()=>onProceed(p)} 
                                onSelect={()=>onSelect(p)} 
                                plan={p} 
                                selected={cp===p.name}
                                />
                        )
                    }
                    <ContactUs />
                    </div>
                </div>   
                <div className='s-plan-topup'>
                    <div className='s-plan-topup-c'>
                    <div style={{fontWeight: 600, marginBottom: '10px', fontSize: 22, color: '#3634be'}}>Topups</div>
                        {
                            topups.map((topup, i)=><TopupComponent onTopup={onTopup} topups={topups} si={i} topup={topup}/>)
                        }
                    </div>
                </div>
                
            </div>
            <div style={{fontWeight: 600, fontSize: 22, color: '#3634be', marginTop: '16px'}}>Transactions</div>
                    <div style={{fontWeight: 500, fontSize: 17, color: '#777', marginTop: 4, marginBottom: 16}}>My latest transactions.</div>
                    <div className="table-container">
                    <table className="data-table">
                        <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Razorpay Payment ID</th>
                            <th>Razorpay Order ID</th>
                            <th>Plan</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {transactions.map((item, index) => (
                            <tr key={index}>
                            <td>{item.order_creation_id}</td>
                            <td>{item.razorpay_payment_id}</td>
                            <td>{item.razorpay_order_id}</td>
                            <td>{item.plan_name}</td>
                            <td>Success</td>
                            <td>{getDateFormat(new Date(item.createdOn))}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
       
        </div>
    )
}
export default Subscription