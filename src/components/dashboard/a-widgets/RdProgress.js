import React from 'react';
import './RdProgress.css'
const RdProgress = () => {
    return (    
        <div className="rd-progress">
            <div className="circle">
            <div className="mask full">
                <div className="fill"></div>
            </div>
            <div className="mask half">
                <div className="fill"></div>
            </div>
            <div className="inside-circle"> 75% </div>
            </div>
        </div>
    );
};

export default RdProgress;