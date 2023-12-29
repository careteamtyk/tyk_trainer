const LeaveHelper = (props)=>{
    const {socket, names, linkCode, setNames} = props
    socket.on('gone-'+linkCode, m=>{
            let n = [...names]
            let ind = n.findIndex(s=>s.id === m.id)
            if(ind !== -1){
                n.splice(ind, 1)
                setNames(n)
            }
    })
    return(
        <>

        </>
    )
}
export default LeaveHelper