import React from 'react';
import { answerExists, getAnswers, isAssessmentCompleted } from './utilities/utility';
import { Navigate, useNavigate } from 'react-router-dom';
import { useHistory } from "react-router-dom";


const getLink = ()=>{
    if(answerExists()){
        let asm = getAnswers()
        let name = asm.name
        let linkCode = asm.linkCode
        return "/assessment/"+linkCode+"/answer-sheet/"+encodeURI(name)
    }else{
        return ''
    }
}

const ProtectLive = ({children}) => {
    return !isAssessmentCompleted()? children: getLink() === ''?<div>Wrong place</div>: <Navigate to={getLink()} />
};

export default ProtectLive;