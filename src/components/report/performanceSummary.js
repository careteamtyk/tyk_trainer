import './performanceSummary.css'
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import axios from 'axios';
import { API_ENDPOINT, HEADER_TOKEN } from '../../constants/constants';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import ViewOnlyQuestionBox from '../dashboard/optionmodes/questionsbox/viewOnlyQuestion';
const PerformanceSummary = (props)=>{
    const {linkCode, questions} = props
    const [qs, setQs] = useState([])
    const [names, setNames] = useState([])
    const [showQn, setShowQn] = useState(false)
    const [qnn, setQnn] = useState({})
    useEffect(()=>{
        loadResponses()
    }, [])
    function loadResponses(){
        axios.post(API_ENDPOINT+'trainer/option-response-performance-summary', {linkCode}, HEADER_TOKEN).then(res=>{
            let d = res.data
            console.log(d)
            if(d.success){
                setQs(d.message)
                theNames(d.message)
            }else{
                toast(d.message)
            }
        })
    }
    function theNames(ans){
       let nms = ans.reduce(function(acc, curr) {
            // Check if there exist an object in empty array whose CategoryId matches
            let isElemExist = acc.findIndex(function(item) {
              return item.name === curr.name;
            })
            if (isElemExist === -1) {
              let obj = {};
              obj.name = curr.name;
              obj.count = 1;
              acc.push(obj)
            } else {
              acc[isElemExist].count += 1
            }
            return acc;
          }, [])
        setNames(nms)
    }
    const isCorrect = (q, name)=>{
        let fq = qs.find(qn=>qn.name === name && qn.question_id===q.question_id)
        if(fq !== undefined){
            return fq.choiceCorrect === 1
        }else
            return false
    }
    // 
    const onMouseEnter = (q)=>{
        setQnn(q)
        setShowQn(true)
    }
    const onMouseExit = ()=>{
        setShowQn(false)
    }
    return(
        <div className='performance-summary'>
            <div style={{overflowX:'auto'}}>
                {
                    names.length>0?
                    <table>
                        <tr>
                        <th>SI No</th>
                        <th>Participant Name</th>
                        {
                            questions.map((q, i)=>(
                                <th className='qh_rd' onMouseEnter={()=>onMouseEnter(q)}  onMouseLeave={onMouseExit}>
                                    {`Q${i+1}`}
                                    {
                                        showQn?
                                        <ViewOnlyQuestionBox q={qnn}/>:''
                                    }
                                </th>
                            ))
                        }
                        </tr>
                        {
                            names.map((nm, i)=>(
                                <tr><td>{i+1}</td><td>{nm.name}</td>
                                    {
                                        questions.map((q,i)=>(
                                            <td>{isCorrect(q, nm.name)?<DoneIcon sx={{color: 'green'}}/>:<ClearIcon sx={{color: 'red'}}/>}</td>
                                        ))
                                    }
                                    <td> <a href={"/assessment/"+linkCode+"/answer-sheet/"+encodeURI(nm.name)} target="_blank">Answer Sheet</a></td>                                  
                                </tr>
                                )
                            )
                        }

                    </table>:
                    <CircularProgress />
                }

                </div>
        </div>
    )
}
export default PerformanceSummary