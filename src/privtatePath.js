import { Navigate } from "react-router-dom";
import { isLoggedIn } from "./utilities/utility";
const PrivatePath = ({ children })=>{
    return isLoggedIn()? children : <Navigate to="/login" />;
}
export default PrivatePath 