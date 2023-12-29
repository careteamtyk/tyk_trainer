import Shimmer from "react-shimmer-effect";
const TopicShimmer = ()=>{
    const sc = {
        display: 'block'
    }
    const topic = {
        margin: '8px',
        borderRadius: '8px',
        height: '48px',
        display: 'block'
    }
    return(
        <div style={sc}>
            <Shimmer>
            <div style={topic}></div>
            <div style={topic}></div>
            <div style={topic}></div>
            <div style={topic}></div>
            </Shimmer>
        </div>
    )
}
export default TopicShimmer