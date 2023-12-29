import './Topic.css'
const Topic = (props)=>{
    const {text} = props
    return (
        <div className='ql-topic-d'>
            <div>{text}</div>
        </div>
    )
}
export default Topic