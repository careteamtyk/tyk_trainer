import FooterBlue from './footerBlue';
import FooterBlack from './footerBlack';
const Footer = (props)=>{
    const {isOne, isBlack} = props
    return(
    <div>
        {
            isOne?<>{isBlack?<FooterBlack />:<FooterBlue />}</>:<><FooterBlue /><FooterBlack /></>
        }
    </div>
    )
}
export default Footer