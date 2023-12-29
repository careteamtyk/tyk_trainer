import React, { useCallback } from 'react';
import './CloseButton.css'
const CloseButton = ({
    onClose, myStyle={}
}) => {

    return <div style={myStyle} onClick={onClose} class="btn-cross-close"></div>
}
export default CloseButton;