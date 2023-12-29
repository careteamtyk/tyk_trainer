import { CircularProgress } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { API_ENDPOINT } from '../../constants/constants'
import './candidateSummary.css'
const CandidateSummary = (props)=>{
    const {a, linkCode, setAvScore, setResponseList} = props
    const [cs, setCs] = useState([])
    useEffect(()=>{
        loadCandidateResponses()
    }, [])


    /*

600/18 + 400/18+800/18
=100/18(6+4+8)

    6+4+8 = 18
    
    avg = 6


     */
    const loadCandidateResponses = ()=>{
        axios.post(API_ENDPOINT+'user/get-option-response', {linkCode: linkCode}).then(res=>{
            let d = res.data
            if(d.success){
                let clist = d.message
                setCs(clist)
                setResponseList(clist)
                
            }
        })
    }
    return(
        <div className="candidate-summary">
           {Object.keys(cs).length>0?
                <div style={{overflowX:'auto'}}>
                    <table>
                        <tr>
                        <th>SI No</th>
                        <th>Participant Name</th>
                        <th>Correct answered</th>
                        <th>Wrong answered</th>
                        <th>Unattempted</th>
                        <th>Percentage</th>
                        <th>View</th>
                        </tr>
                        {
                            cs.map((c,i)=>(
                                <tr>
                                    <td>{i+1}</td>
                                    <td>{c._id}</td>
                                    <td>{c.totalCorrect}</td>
                                    <td>{c.count-c.totalCorrect}</td>
                                    <td>{a.questions.length-c.count}</td>
                                    <td>{parseInt((c.totalCorrect/a.questions.length)*100)}%</td>
                                    <td><a target="_blank" href={"/assessment/"+linkCode+"/answer-sheet/"+encodeURI(c._id)} >Answer Sheet</a></td>
                                </tr>
                            ))
                        }
                    </table>
                </div>:
                <CircularProgress />
            }
        </div>
    )
}
export default CandidateSummary