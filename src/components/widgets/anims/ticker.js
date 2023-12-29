import './ticker.css'
const Ticker = (props)=>{
    const {func} = props
    const animEnd = ()=>{
        setTimeout(()=>{
            func()
        }, 1000)
    }
    return(
        <div className="anim-ticker">
           <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                    <path onAnimationEnd={animEnd} className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
        </div>
    )
}
export default Ticker