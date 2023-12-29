const Tkheader = (props)=>{
    const {title, size} = props
    return(
        <div style={{display: 'block', fontSize: size?size:20, fontWeight: 500, marginTop: 10, marginBottom: 10, color: 'rgb(78 77 77)'}}>
            {title}
        </div>
    )
}
export default Tkheader