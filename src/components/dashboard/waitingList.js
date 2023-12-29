import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GroupsIcon from '@mui/icons-material/Groups';
import SearchBar from '../widgets/searchBar';
import SortIcon from '@mui/icons-material/Sort';
import CandidateItem from './a-widgets/CandidateItem';

const WaitingList = (props) => {
    const {names} = props
    const [clist, setClist] = useState([...names])
    const [searchQ, setSearchQ] = useState('')
    const [sortA, setSortA] = useState(false)

    const onTopicSearch = (e)=>{
        setSearchQ(e.target.value)
    }
    useEffect(()=>{
        if(sortA){
            let nms = [...names]
            nms.sort(function(a, b){
                var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                if (nameA < nameB) //sort string ascending
                 return -1;
                if (nameA > nameB)
                 return 1;
                return 0; //default return value (no sorting)
               });
            setClist(nms)
            
        }else{
            let nms = [...names]
            setClist(nms)
        }
    }, [sortA, names])
    const searchList = searchQ ===''?[]:clist.filter(s=>new RegExp(searchQ, 'i').test(s.name))
    return (
        <div style={{marginRight: '12px', marginLeft: '12px'}}>
            <div style={{display: 'flex', padding: '12px 12px', backgroundColor: 'white', borderRadius: '12px', boxShadow: 'rgb(162 183 250 / 16%) 0px 1px 2px, rgb(127 148 244 / 23%) 0px 0px 3px'}}>
                <Button startIcon={<GroupsIcon />} sx={{textTransform: 'none'}} variant='outlined'>
                    {names.length} Participants
                </Button>
                <div style={{alignSelf: 'center', marginLeft: '16px'}}>
                <SearchBar size="9px" placeholder="Search Topic" onSearch={onTopicSearch}/>
                </div>
                <div style={{flex: 1}}></div>
                <Button onClick={()=>setSortA(!sortA)} startIcon={<SortIcon />} sx={{textTransform: 'none'}} variant='outlined'>Sort by A-Z</Button>
            </div>

            <div style={{marginTop: '8px'}}>
                { 
                    searchQ !==''?searchList.map(s=><CandidateItem name={s.name} />):
                    clist.map(nm=><CandidateItem name={nm.name} />)
                }
                {
                      names.length === 0?<><center><br /><br /><br /><h2 style={{color: '#888'}}>Waiting for Candidates</h2></center></>:''
                }
            </div>
            
        </div>
    );
};

export default WaitingList;