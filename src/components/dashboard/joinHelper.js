const JoinHelper = (props)=>{
    const {socket, names, linkCode, setNames} = props
    socket.on('joined-'+linkCode, m=>{
        let i = names.findIndex(name=>name.name === m.name)
        if(i === -1){
            let n = [...names]
            n.push(m)
            setNames(n)
        }
    })
    return(
        <>

        </>
    )
}
export default JoinHelper