import { ReduceCapacityTwoTone } from "@mui/icons-material"
import { MONTHS } from "../constants/constants"

const TOKEN = "token1"
const NAME = "name"
const PHONE = "phone"
const DRAFT = "draft"
const ASSESSMENT = "assessment"
const ANSWERS = "answers"
const CANDIDATE_NAME = "candidate_name"
const saveToken = (token)=>{
    localStorage.setItem(TOKEN,token)
}
const getToken = () =>{
   return localStorage.getItem(TOKEN)
}
const deleteToken = ()=>{
   localStorage.removeItem(TOKEN)
}
const isLoggedIn = ()=>{
   return localStorage.getItem(TOKEN)!== null
}
const saveName = (name)=>{
   localStorage.setItem(NAME, name)
}
const getName = () =>{
   return localStorage.getItem(NAME)
}
const saveDraft = (draft)=>{
   localStorage.setItem(DRAFT, JSON.stringify(draft))
}
const getDraft = () =>{
   return JSON.parse(localStorage.getItem(DRAFT))
}
const saveCandidateName = (toSave)=>{
   localStorage.setItem(CANDIDATE_NAME, JSON.stringify(toSave))
}
const getCandidateName = ()=>{
   return JSON.parse(localStorage.getItem(CANDIDATE_NAME))
}
const deleteCandidate = ()=>{
   localStorage.removeItem(CANDIDATE_NAME)
}
const isCandidateExists = ()=>{
   return localStorage.getItem(CANDIDATE_NAME)!== null
}
const isDraftExists = ()=>{
   return localStorage.getItem(DRAFT)!== null
}
const savePhone = (name)=>{
   localStorage.setItem(PHONE, name)
}
const getPhone = () =>{
   return localStorage.getItem(PHONE)
}

const saveAssessment = (assessment)=>{
   localStorage.setItem(ASSESSMENT, JSON.stringify(assessment))
}
const getAssessment = ()=>{
   return JSON.parse(localStorage.getItem(ASSESSMENT))
}
const isAssessmentExists = ()=>{
   return localStorage.getItem(ASSESSMENT)!== null
}
const saveAnswers = (ans)=>{
   localStorage.setItem(ANSWERS, JSON.stringify(ans))
}
const getAnswers = ()=>{
   return JSON.parse(localStorage.getItem(ANSWERS))
}
const answerExists = ()=>{
   return localStorage.getItem(ANSWERS)!== null
}

export const isAssessmentCompleted = ()=>{
  if(answerExists()){
   let asm = getAnswers()
   return asm.completed? true:false 
  }else{
      return false
  }
}

const shuffleFisherYates = (arr)=>{
   for(var i =arr.length-1 ; i>0 ;i--){
      var j = Math.floor( Math.random() * (i + 1) ); //random index
      [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
  }
   return arr
 }
 const checkColumns  = (cols)=>{
      if(cols.length !== 14){
         return false
      }else{
         if(cols[0] != "question" || cols[1] != "optionA" || cols[2] != "isOptionACorrect" || cols[3] !="optionB" || cols[4] != "isOptionBCorrect" || cols[5] !="optionC" || cols[6] != "isOptionCCorrect" || cols[7] !="optionD" || cols[8] !="isOptionDCorrect" || cols[9] != "optionE" || cols[10] != "isOptionECorrect" || cols[11] !="optionF" || cols[12] != "isOptionFCorrect" || cols[13] != "Topic"){
            return false
         }
      }
      return true
 }
 const optionChecker = (c, d, e, f)=>{
    let cond1 = d!=="" && c!==""
    let cond2 = e!=="" && cond1
    let cond3 = f!=="" && cond2
    let cond4 = f!=="" || e!=="" || d!==""
    let cond = cond4 && (cond3 || cond2 || cond1)
    return cond

 }
 const cleanO = (str)=>{
   if(str === null)
      return ""
   if(typeof str !== "string")
       str = str.toString()
   return str
}
 const checkRows = (row)=>{
      if(row.length !== 14){
         return false
      }else{
         return !isEmpty(row[0]) || !isEmpty(row[1]) || !isEmpty(row)    
      }
 }
 const getDateFormat = (d)=>{
   var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   let y = d.getFullYear()
   let dd = '0'+d.getDate()
   let h = '0'+d.getHours()
   let min = '0'+d.getMinutes()
   return dd.slice(-2)+' '+months[d.getMonth()]+' '+y+', '+h.slice(-2)+':'+min.slice(-2)
}
const getColor  = (pc)=>{
   if(pc < 10)
         return "red"
   else if(pc < 50 && pc>=10){
         return "blue"
   }else if(pc>=50 && pc<70){
         return "orange"
   }else{
         return "green"
   }
}
const getHeader = ()=>{
   return {
      headers:{
          'content-type': 'application/json',
          token: getToken()
      }
  }
}
const getMonth = (ind)=>{
   return MONTHS[ind]
}
function isEmpty(str){
   return str === "" || str===null
}
class MockTestA extends Array {
   sum(key) {
       return this.reduce((a, b) => parseInt(a) + (parseInt(b[key]) || 0), 0);
   }
}
const getRemainingDays = (planO)=>{
   let date = new Date(planO.createdOn)
   let now = new Date()
   let daysdiff = (now.getTime()-date.getTime())/(1000 * 60 * 60 * 24)
   let daysremaining = parseInt(planO.validity)-parseInt(daysdiff)
   return daysremaining
}
function calculateMarkedPrice(cp, discount) {
   let mp = cp / (1 - (discount/100));
   return  Math.floor(mp);
}
export {
   calculateMarkedPrice,
   getRemainingDays,
   saveAnswers, 
   MockTestA, getHeader, getMonth, deleteCandidate, saveCandidateName, getCandidateName, isCandidateExists, getAnswers, answerExists, saveAssessment, getAssessment, isAssessmentExists, saveDraft, isDraftExists, getDraft, saveToken, cleanO, savePhone, getPhone, getDateFormat, shuffleFisherYates, checkColumns, checkRows, getToken, saveName, getName, isLoggedIn, deleteToken, optionChecker, getColor};

