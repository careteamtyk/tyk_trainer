import { useEffect, useState } from 'react'
import readXlsxFile from 'read-excel-file'
import applogo from '../../assets/svgs/applogo.svg'
import './reader.css'
const Reader = ()=>{
    const [rr, setRR] = useState([])
    const handleChose = (event)=>{
        readXlsxFile(event.target.files[0]).then((rows) => {
             setRR(rows)
          })
    }
    return(
        <div>
            <br />
            <center>
                <img style={{width: 220}} src={applogo} alt='App Logo'/>
            </center>
            <br />
            <div style={{display: 'table', padding: 16, border: '2px solid #543de3', borderRadius: 6, margin: 'auto'}}>
            <input onChange={handleChose} type="file" id="input" />
            </div>
            <div style={{maxWidth: 1200, margin: 'auto', marginTop: 16, borderRadius: 12, overflow: 'hidden'}}>
            {
                rr.length>0?
                <table id="customers">
                    <tr>
                        <th>Question</th>
                        <th>option A</th>
                        <th>option B</th>
                        <th>option C</th>
                        <th>option D</th>
                        <th>option E</th>
                        <th>option F</th>
                        <th>Answer</th>

                    </tr>
                    {
                        rr.map(r=>(
                            <tr>
                                <td>{r[0]}</td>
                                <td>{r[1]}</td>
                                <td>{r[2]}</td>
                                <td>{r[3]}</td>
                                <td>{r[4]}</td>
                                <td>{r[5]}</td>
                                <td>{r[6]}</td>
                                <td>{r[7]}</td>
                            </tr>
                        ))
                    }
                </table>       
                :''
            }
            </div>
        </div>
    )
}
export default Reader