import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Checkbox,
  CircularProgress,
  FilledInput,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import fbicon from "../../assets/images/fb.png";
import outlookIcon from "./outlook.png";
import gicon from "../../assets/images/g.png";
import applogo from "../../assets/svgs/applogo.svg";
import { toast } from "react-toastify";
import "./auth.css";
import { saveName, savePhone, saveToken } from "../../utilities/utility";
import { API_ENDPOINT } from "../../constants/constants";
import PhoneInput from "react-phone-number-input";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId:
          "848886668045-b6m1lgm6u6thgnm6bakg4nk6hntbtbce.apps.googleusercontent.com",
        plugin_name: "chat",
      });
    });
  }, []);

  const handleSignIn = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axios
      .post(API_ENDPOINT + "trainer/login", { phone, password })
      .then((res) => {
        setIsLoading(false);
        const d = res.data;
        console.log(d);
        if (d.success) {
          saveToken(d.message.data.token);
          saveName(d.message.data.name);
          savePhone(d.message.data.phone);
          document.location.href = "/trainer";
        } else {
          toast(d.message);
        }
      });
  };
  const handleSignUp = () => {
    document.location.href = "/register";
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const forgotPassword = () => {
    document.location.href = "/generate-reset-link";
  };
  const handleGoogleSuccess = (response) => {
    console.log(
      "Google login was successful, received the following response:",
      response
    );
    // You can now use the response object to retrieve user details, access token, etc.
    // For example:
    // const accessToken = response.accessToken;
    // const profile = response.profileObj;

    const email = response.profileObj.email;
    const googleId = response.profileObj.googleId;
    googleLogin(email);
  };

  const handleGoogleFailure = (error) => {
    //toast.error(`Google login was unsuccessful, received the following error: ${error}`)
    console.error(
      "Google login was unsuccessful, received the following error:",
      error
    );
  };
  const logoClick = () => {
    document.location.href = "/";
  };
  const outLookLoginClick = () => {
    toast("OutLook Login is not currently available for this app");
  };

  const googleLogin = (email) => {
    axios.post(API_ENDPOINT + "trainer/google-login", { email }).then((res) => {
      setIsLoading(false);
      const d = res.data;
      console.log(d);
      if (d.success) {
        saveToken(d.message.data.token);
        saveName(d.message.data.name);
        savePhone(d.message.data.phone);
        document.location.href = "/trainer";
      } else {
        toast(d.message);
      }
    });
  };
  return (
    <div className="rd_auth_c">
      <div className="rd_action_box">
        <img
          style={{ cursor: "pointer" }}
          onClick={logoClick}
          className="action_app_logo"
          src={applogo}
        />
        <div className="action_tagline">Welcome back, Sign In to continue</div>
        <div className="rd_form_c">
          <form onSubmit={handleSignIn}>
            <PhoneInput
              defaultCountry="IN"
              placeholder="Phone number"
              required
              value={phone}
              onChange={setPhone}
            />
            <FormControl
              size="small"
              required
              fullWidth
              sx={{ m: 1 }}
              variant="standard"
            >
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ display: "flex", marginRight: "30px" }}>
                <Checkbox />
                <div style={{ alignSelf: "center" }}>Remember me</div>
              </div>
              <div
                onClick={forgotPassword}
                style={{ flex: 1, display: "flex", justifyContent: "end" }}
              >
                <div
                  style={{
                    alignSelf: "center",
                    textDecoration: "underline",
                    color: "#3ab646",
                    cursor: "pointer",
                  }}
                >
                  Forgot Password?
                </div>
              </div>
            </div>
            <button
              disabled={isLoading}
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: "#4d4d4d",
                color: "white",
                cursor: "pointer",
                border: "none",
                borderRadius: 6,
                width: "100%",
                marginTop: 12,
              }}
            >
              Sign In
            </button>
          </form>
          {isLoading ? (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            ""
          )}
          {/* <div style={{ display: "flex", width: "100%", marginTop: 16 }}>
            <div
              style={{
                cursor: "pointer",
                border: "1px solid #ccc",
                borderRadius: 4,
                flex: 1,
                margin: 8,
              }}
            >
              <GoogleLogin
                clientId="848886668045-b6m1lgm6u6thgnm6bakg4nk6hntbtbce.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={handleGoogleSuccess}
                onFailure={handleGoogleFailure}
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                border: "1px solid #ccc",
                borderRadius: 4,
                flex: 1,
                margin: 8,
                paddingLeft: 12,
                paddingRight: 12,
              }}
            >
              <div
                onClick={outLookLoginClick}
                style={{ display: "flex", alignSelf: "center", padding: 2 }}
              >
                <img style={{ width: 24, marginRight: 6 }} src={outlookIcon} />
                <div style={{ alignSelf: "center", whiteSpace: "nowrap" }}>
                  Login with Outlook
                </div>
              </div>
            </div>
          </div> */}
          <br />
          <center>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <div>Don't have an Account?</div>
              <div
                onClick={handleSignUp}
                style={{
                  fontWeight: "bold",
                  color: "#6f51ff",
                  cursor: "pointer",
                  marginLeft: "8px",
                }}
              >
                SignUp
              </div>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
};
export default Login;

{
  /* <div style={{display: 'flex', padding: 2}}>
                         <img style={{width: 22, marginLeft: 12, marginRight: 6}} src={gicon} />
                        <div style={{alignSelf: 'center', whiteSpace: 'nowrap'}}>Login with Google</div>
                       
                      
                      </div> */
}
