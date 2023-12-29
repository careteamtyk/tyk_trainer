import './qsFigure.css'
const QsFigure  = (props)=>{
    const {cA, wA} = props
    return(
        <div className='qs-figure'>
            <div><span className='qs-figure-l'>Correct:</span> <span className='qs-figure-c-i'>{`${cA}%`}</span></div>
            <div><span className='qs-figure-l'>Wrong:</span> <span className='qs-figure-w-i'>{`${wA}%`}</span></div>
        </div>
    )
}
export default QsFigure
