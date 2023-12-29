import MyAssessmentC from "../widgets/myAssessmentC"
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios";
import { API_ENDPOINT, HEADER_TOKEN, MONTHS } from '../../constants/constants'
import { Button, FormControl, IconButton, InputBase, InputLabel, MenuItem, Paper, Select } from "@mui/material";
import './myAssessments.css'
import SortIcon from '@mui/icons-material/Sort';
import MaterialMenu from "../widgets/MaterialMenu";
import MaterialSelect from "../widgets/MaterialSelect";
import SearchBar from "../widgets/searchBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomCircularP from "../widgets/customCircularP";
import { getHeader } from "../../utilities/utility";
const MyAssessments = ()=>{
    const navigate = useNavigate()
    const options = ["All", "Completed", "Upcoming", "Draft"]
    const [cmonth, setCmonth] = useState('');
    const [cyear, setCyear] = useState('');
    const [loading, setLoading] = useState(false)
    const [assessments, setAssessments] = useState([])
    const [cfilter, setCfilter] = useState("All")
    const [searchQ, setSearchQ] = useState('')
    const [anchorEl, setAnchorEl] = useState(null);
    useEffect(()=>{
        loadAssessments()
    },[searchQ, cfilter, cmonth, cyear])
    function loadAssessments(){
        setLoading(true);
        let cm = ''
        if(cmonth !==''){
            cm = MONTHS.indexOf(cmonth)
        }

        axios.post(API_ENDPOINT + 'trainer/get-assessments', {searchQ, cfilter, cmonth: cm, cyear}, getHeader())
            .then(res => {
                setLoading(false);
                let d = res.data;
                setAssessments(d.data);
            })
            .catch(error => {
                setLoading(false);
                toast.error(`There was an error: ${error}`);
            });
    }
    const onSearch = (e)=>{
        setSearchQ(e.target.value)
    }
    const onFilterClick = (event)=>{
        event.stopPropagation()
        setAnchorEl(event.target)
    }
    const onItemSelect = (selV)=>{
        if(selV !== options[3]){
            setCfilter(selV)
        }else{
            navigate("/trainer/create-assessment/draft")
        }
    }
    return(
        <div style={{maxWidth: '1000px', margin: 'auto'}}>
            <CustomCircularP show={loading}/>
             <div style={{display: 'flex', marginLeft: '8px', marginRight: '16px'}}>
            <SearchBar size="9px" placeholder='Search Assessment' onSearch={onSearch} myStyle={{width: '276px'}}/>
            <div style={{marginLeft: '16px', marginRight: '16px'}}>
                <Button onClick={onFilterClick} sx={{height: '98%'}} startIcon={<SortIcon />} variant="outlined">{cfilter==="All"?"Filter":cfilter}</Button>
                <MaterialMenu menuList={options} onItemSelect={onItemSelect} anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
            </div>
            <MaterialSelect selectList={["2023", "2022"]} title="Filter by Year" itemSelect={cyear} setItemSelect={setCyear} />
            <MaterialSelect selectList={MONTHS} title="Filter by Months" itemSelect={cmonth} setItemSelect={setCmonth} myStyle={{marginLeft: '12px'}}/>
            </div>
            <div style={{marginTop: 12, height: '77vh', overflowY: 'auto'}}>
    {
        assessments.length > 0 
        ? assessments.map((as, i) => <MyAssessmentC key={i} assessment={as} />)
        : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: 18, color: 'grey' }}>
            No assessment found
          </div>
    }
</div>

        </div>
    )
}
export default MyAssessments