import { useState } from 'react'
import { buttonColorYellow, buttonColorYellowHover } from '../../utilities/themes'
import RdButton from './rdButton'
import './widget.css'
const HomeCard = (props)=>{
    const {img, title, content, onSelect} = props
    const [buttonColor, setButtonColor] = useState(buttonColorYellow)
    const onClick = ()=>{
        onSelect(title)
    }
    const style={
        backgroundColor: buttonColor
    }
    const rdOnHover = ()=>{
        setButtonColor(buttonColorYellowHover)
    }
    const rdOnHoverOut = ()=>{
        setButtonColor(buttonColorYellow)
    }
    return(
        <div className="home_card">
                   <div className="item1"><img style={{width: '100%'}} src={img} alt=""/></div>
                   <div className="item2">
                       <p style={{color: '#6f51ff', fontSize: 17, fontWeight: 'bold'}}>{title}</p>
                       <p style={{fontSize: 15, color: '#888'}}>{content}</p>
                        <RdButton onMouseOver={rdOnHover} onMouseOut={rdOnHoverOut} style={style} onClick = {onClick} value="Get Started"/>
                   </div>
        </div>
    )
}
export default HomeCard