import { useState } from "react"

const Test = ()=>{
    const [val1, setVal1] = useState()
return (<div>

    <ComponentA val1={val1} setVal1={setVal1} />
    <ComponentB val1 = {val1} setVal1 = {setVal1} />
</div>)


}
export default Test

const ComponentA = (props)=>{
    const {val1, setVal1} = props

    return(
        <div>
            <input value={val1} onChange={e=>setVal1(e.target.value)} />
        </div>
    )
}
const ComponentB = (props)=>{
    const {val1, setVal1} = props

    return(
        <div>
            <input value={val1} onChange={e=>setVal1(e.target.value)} />
        </div>
    )
}

