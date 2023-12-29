const saveResponse = (response)=>{
    localStorage.setItem("response",JSON.stringify(response))
}
const getResponse = () =>{
   return JSON.parse(localStorage.getItem("response"))
}
const deleteResponse = ()=>{
   localStorage.removeItem("response")
}
const saveTime = (time)=>{
    localStorage.setItem("duration",JSON.stringify(time))
}
const getTime = ()=>{
    localStorage.getItem("duration")
}
const deleteTime = ()=>{
    localStorage.removeItem("duration")
}

export {saveResponse, getResponse, deleteResponse, saveTime, getTime, deleteTime};

