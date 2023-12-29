import React from 'react';
import applogo from '../../../assets/svgs/applogo.svg'
import aprofile from '../../../assets/images/aprofile.png'
import AnswerBox from '../../assessment/live/widgets/answerBox';
const MockTestResponseSheet = ({
    mockTest
}) => {
    return (
        <div className="user-response">
        <div>
            <div className="user-response-header">
                <img src={applogo}  style={{height: '90px', alignSelf: 'center'}}/>
                <div className="ur-atitle">{mockTest.title}</div>
                <div className="ur-details">
                    <center><img src={aprofile} style={{height: '90px'}}/>
                    <div style={{fontSize: 15, color: '#444', marginTop: 8}}>{mockTest.candidate_name}</div>
                    <div style={{display: 'flex', color: 'green', justifyContent: 'center'}}>
                        <div style={{alignSelf: 'center'}}>Your Score</div>
                        <div style={{fontSize: 30, marginLeft: 16}}>{mockTest.allquestions.filter(mq=>mq.choiceCorrect).length+'/'+mockTest.numQns}</div>
                    </div>
                    </center>
                </div>
            </div>
            <div className="ur-content">
                <div className="ur-label-action">
                    <h2 style={{flex: 1}}>Answer Sheet</h2>        
                </div>
                {mockTest.allquestions.map(b=><AnswerBox assessment={mockTest}  answer={b} />)}
            </div>
        </div>
    </div>
    );
};

export default MockTestResponseSheet;