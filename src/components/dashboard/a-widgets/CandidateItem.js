import React from 'react';
import './CandidateItem.css'
const CandidateItem = (props) => {
    const {name} = props
    return (
        <div className='name-c'>
            <div className='name-first-letter'>
                <div style={{alignSelf: 'center', fontWeight: 600}}>{name.slice(0, 1).toUpperCase()}</div>
            </div>
            <div style={{alignSelf: 'center', marginLeft: '8px', color: '#777'}}>
                {name}
            </div>

        </div>
    );
};

export default CandidateItem;