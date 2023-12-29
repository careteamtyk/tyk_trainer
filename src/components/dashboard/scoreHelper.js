const ScoreHelper = (props)=>{
    const {socket, names, linkCode, setNames} = props
    socket.on('goLive-'+linkCode, m=>{

        console.log(names, m)

        let i = names.findIndex(name=>name.name === m.name)
        if(i === -1){
            let n = [...names]
            n.push(m)
            setNames(n)
        }else{
            let nms = [...names]
            let nm = nms.find(n=>n.name === m.name)
            nm.score = m.score
            setNames(nms)
        }
    })
    return(
        <>

        </>
    )
}
export default ScoreHelper