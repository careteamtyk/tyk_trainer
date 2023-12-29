import './planComponent.css'
const PlanComponent = ({planData})=>{
    return(
      <div className='plan-component'>
        <div style={{padding: '10px 10px', borderRight: '1px solid #ddd', flex: 1}}>
           <div className='plan-h'>Plan Active</div>
           <div className='plan-v'>{planData && planData.name}</div>
        </div>
        <div style={{padding: '10px 10px', borderRight: '1px solid #ddd', flex: 1}}>
           <div className='plan-h'>Quota</div>
           <div className='plan-v'>{planData && planData.count}</div>
        </div>
        <div style={{padding: '10px 14px', borderRight: '1px solid #ddd', flex: 1}}>
           <div className='plan-h'>Remaining</div>
           <div className='plan-v'>{planData && planData.balance}</div>
        </div>
        <div style={{padding: '10px 14px', borderRight: '1px solid #ddd', flex: 1}}>
           <div className='plan-h'>Topup Bal.</div>
           <div className='plan-v'>{planData && (planData.topup? planData.topup:"NA")}</div>
        </div>
        <div style={{padding: '10px px', flex: 1}}>
           <div className='plan-h'>Topup Remaining</div>
           <div className='plan-v'>{planData && planData.balance}</div>
        </div>
    </div>
    )
}
export default PlanComponent