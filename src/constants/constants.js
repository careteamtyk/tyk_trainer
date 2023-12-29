import { LocalOffer } from "@mui/icons-material"
import { getToken } from "../utilities/utility"
const LOCAL = "local"
const PRODUCTION="production"
const DEFAULT_ASSESSMENT_ICON = '/apple-icon.png'
const state = PRODUCTION
const RAZORPAY_KEY_ID=`${process.env.REACT_APP_RAZORPAY_KEY_ID}`
const API_ENDPOINT = state === PRODUCTION?`${process.env.REACT_APP_API_LIVE_HOST}`:`http://localhost:5624/`
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const HEADER_TOKEN={
    headers:{
        'content-type': 'application/json',
        token: getToken()
    }
}
const DEFAULT_BANNER = "/default_test_banner.png"
const IMAGE_UPLOAD_END = API_ENDPOINT+'trainer/upload-image'
const IMAGES_GET_END = API_ENDPOINT+'trainer/get-images'
const ALL_IMAGE_UPLOAD = API_ENDPOINT+"upload/upload-image-only"
const HOSTNAME = state === PRODUCTION?`${process.env.REACT_APP_HOME_LIVE}`:`${process.env.REACT_APP_HOME_LOCAL}`

const PLAN_BASIC = "Basic"
const PLAN_STANDARD = "Standard"
const PLAN_PREMIUM = "Premium"
const TRIAL_PLAN = "Trial Plan"
const RUPEE_SYMBOL = "₹"

export {
    TRIAL_PLAN,
    RUPEE_SYMBOL,
    PLAN_BASIC,
    PLAN_STANDARD,
    PLAN_PREMIUM,
    RAZORPAY_KEY_ID,
    API_ENDPOINT, 
    DEFAULT_BANNER, 
    HEADER_TOKEN, 
    MONTHS,
    HOSTNAME, 
    IMAGE_UPLOAD_END, 
    IMAGES_GET_END, 
    ALL_IMAGE_UPLOAD, 
    DEFAULT_ASSESSMENT_ICON
}