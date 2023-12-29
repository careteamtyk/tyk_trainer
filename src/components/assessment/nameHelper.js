import { useEffect } from "react"

const NameHelper = (props)=>{
    const {socket, name, linkCode} = props
    useEffect(()=>{
        let d = {name: name, linkCode: linkCode}
        socket.emit("joining", d)
    }, [])
    return(
        <>

        </>
    )
}
export default NameHelper