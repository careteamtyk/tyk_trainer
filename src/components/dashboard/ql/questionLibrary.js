import { Button } from "@mui/material";
import axios from "axios"
import { useEffect, useRef, useState } from "react"
import TopicIcon from '@mui/icons-material/Topic';
import GridOnIcon from '@mui/icons-material/GridOn';
import AddTopic from "../ql-widgets/addTopic";
import {toast } from "react-toastify";
import QlTopic from "./qlTopic";
import RdModal from "../../widgets/ratulModal/rdModal";
import MyModal from "../../widgets/myModal/myModal";
import QlExcel from "./qlExcel";
import QlQuestions from "./qlQuestions";
import './questionLibrary.css'
import EmptyContent from "../../widgets/emptyContent";
import QlBtn from "../ql-widgets/qlBtn";
import QuizIcon from '@mui/icons-material/Quiz';
import TopicShimmer from "../../widgets/shimmers/topicShimmer";
import { API_ENDPOINT, HEADER_TOKEN } from "../../../constants/constants";
import DuplicateQuestions from "./duplicateQuestions";
import SearchBar from "../../widgets/searchBar";
const QuestionLibrary = ()=>{
    const [topics, setTopics] = useState([])
    const [topic, setTopic] = useState("")
    const [tsearch, setTsearch] = useState([])
    const [questions, setQuestions] = useState([])
    const [showAddTopic, setShowAddTopic] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showExcelModal, setShowExcelModal] = useState(false)
    const [isTopicsLoaded, setIsTopicsLoaded] = useState(false)
    const [isQL, setIsQL] = useState(false)
    const [refreshT, setRefreshT] = useState(false)
    const [dqModal, setDqModal] = useState(false)
    const [dQs, setDQs] = useState([])

    useEffect(()=>{
        loadTopics()
        getDuplicateQuestions()
    }, [refreshT])
    useEffect(()=>{
        loadTopicQuestions()
    }, [topic])
    function loadTopicQuestions(){
        if(topic === "")
            return
        setIsQL(true)
        axios.post(API_ENDPOINT+'trainer/topics-questions', {topic: topic}, HEADER_TOKEN).then(res=>{
            let d = res.data
            setIsQL(false)
            if(d.success){
                setQuestions(d.message)
            }else{
                toast(d.message, {autoClose: 900, position: 'bottom-center'})
            }
        })
    }
    const getDuplicateQuestions = ()=>{
        axios.post(API_ENDPOINT+'trainer/get-duplicate-questions', {}, HEADER_TOKEN).then(res=>{
            let d = res.data
            if(d.success){
                setDQs(d.message)
            }else{
                toast(d.message, {autoClose: 900, position: 'bottom-center'})
            }     
        })
    }
    const loadTopics = ()=>{
        setIsTopicsLoaded(false)
        axios.post(API_ENDPOINT+'trainer/get-topics-all', {}, HEADER_TOKEN).then(res=>{
            let d = res.data
            if(d.success){
                let tps = d.message
                loadTopicNum(tps)
            }else{
                toast(d.message, {autoClose: 900, position: 'bottom-center'})
            }
        })
    } 
    function loadTopicNum(tps){
        axios.post(API_ENDPOINT+'trainer/get-topics-all-num', {}, HEADER_TOKEN).then(res=>{
            setIsTopicsLoaded(true)
            let d = res.data
            if(d.success){
                let numsa = d.message
                tps.map(tt=>{
                    tt.numQns = 0
                })
                numsa.map((nm, i)=>{
                    let ii = tps.findIndex(a=>a.topic === nm._id)
                    if(ii != -1){
                        tps[ii].numQns = nm.count
                    }else{
                        tps.push({topic: nm._id, status: 'Active', numQns: nm.count})
                    }
                })
                tps.sort((a, b)=>{
                    let fa = a.topic.toLowerCase(),
                    fb = b.topic.toLowerCase();
                    if (fa < fb) {
                        return -1;
                    }
                    if (fa > fb) {
                        return 1;
                    }
                    return 0;
                })
                let actives = tps.filter(t=>t.status === 'Active')
                let inactives = tps.filter(t=>t.status === 'Inactive')
                let ars = actives.concat(inactives)
                setTopics(ars)
            }
        })
    }
    const importExcel = ()=>{
        setShowExcelModal(!showExcelModal)
    }
    const addQuestion = ()=>{
        setShowModal(!showModal)
    }
    const addTopic = ()=>{
        setShowAddTopic(!showAddTopic)
    }
    const onQnDeleted = (dtopic)=>{
        setRefreshT(!refreshT)
    }
    const onQnAdded = (dtopic)=>{
        setRefreshT(!refreshT)
    }
    const showDuplicateQns = (e)=>{
        setDqModal(!dqModal)
    }
    const excelUploaded = ()=>{
        setRefreshT(!refreshT)
    }
    const duplicatesRemoved = ()=>{
        setRefreshT(!refreshT)
        toast("All duplicates removed successfully", {autoClose: 1500, position: 'bottom-center'})
    }
    const onTopicSearch = (e)=>{
        let v = e.target.value
        let ts  = [...topics]
        let ds = ts.filter(s=>new RegExp(v, 'i').test(s.topic))
        setTsearch(ds)
    }
    return(
        <div className="ql-c">
            <RdModal onQnAdded={onQnAdded} isQl={true} questions={questions} setQuestions={setQuestions}  showModal={showModal} setShowModal={setShowModal}/>
            <MyModal showModal={showExcelModal} setShowModal = {setShowExcelModal} title="Import from Excel" modalC={<QlExcel topics={topics} excelUploaded={excelUploaded} showModal={showExcelModal} setShowModal = {setShowExcelModal} />} />
            {dQs.length>0? <MyModal showModal={dqModal} setShowModal={setDqModal} title="Clear Duplicate Questions" modalC={<DuplicateQuestions showModal={dqModal} setShowModal={setDqModal} duplicatesRemoved = {duplicatesRemoved} questions={dQs}/>} />:''}
            <div style={{display: 'flex'}}>
                <div style={{flex: 0.4, paddingRight: 16}}>
                <div className="ql-topic-h">
                    <div className="ql-topic-h-l">Topics:</div>
                    <SearchBar size="9px" placeholder="Search Topic" onSearch={onTopicSearch}/>
                    <div className="ql-topic-h-a" style={{marginLeft: '12px'}}>
                        <Button  onClick = {addTopic} startIcon={<TopicIcon/>} variant="contained" sx={{width: '120px'}}>Add Topic</Button>
                        <AddTopic show={showAddTopic}  setShow={setShowAddTopic} topics={topics} setTopics={setTopics}/>
                    </div>
                </div>
                <div className="ql-topics-c">
                    {
                        isTopicsLoaded?
                        topics.length>0?

                        tsearch.length>0?
                        tsearch.map(t=>(
                            <QlTopic topics = {tsearch} setTopics = {setTsearch} selected={topic===t.topic} setTopic={setTopic} numQns={t.numQns} topic={t.topic} status={t.status}/>
                        )):
                        topics.map(t=>(
                            <QlTopic topics = {topics} setTopics = {setTopics} selected={topic===t.topic} setTopic={setTopic} numQns={t.numQns} topic={t.topic} status={t.status}/>
                        ))
                        
                        
                        :<EmptyContent lv="No Topics Yet" />
                        :<TopicShimmer />
                    }
                </div>
                    {
                        dQs.length>0? <div onClick={showDuplicateQns} className="duplicates-q-c"><div className="duplicates-q-l">{`+${dQs.length} Questions have duplicates`}</div></div>:''
                    }
                <div className="ql-action">
                    <QlBtn hl="Upload Questions from Excel" bl="Upload Questions" ic={<GridOnIcon />} onClick = {importExcel}/>
                    <QlBtn hl="Create Questions manually" bl="Add Question" ic={<QuizIcon />}  onClick={addQuestion}/>
                </div>
                </div>
                <div style={{flex: 0.6, paddingRight: 16}}>
                <QlQuestions isQL={isQL} onQnDeleted={onQnDeleted}  questions={questions} setQuestions={setQuestions}/>
                </div>
            </div>
        </div>
    )
}
export default QuestionLibrary