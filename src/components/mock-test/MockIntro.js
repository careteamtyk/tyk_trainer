import React from 'react';
import './MockIntro.css'
const MockIntro = () => {
    const loc = document.location.href.replace(/\/+$/, "")
    const keysUrl = loc.split('/')
    const linkCode = keysUrl[4]
    console.log(linkCode)
    return (
        <div className='mock-intro'>
            MockIntro
        </div>
    );
};
export default MockIntro;