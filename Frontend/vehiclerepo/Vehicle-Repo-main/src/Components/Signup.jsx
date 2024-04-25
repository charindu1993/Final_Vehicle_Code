import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import DataContext from "../store/store";
function Signup() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const [password, setPassword] = React.useState();
  const [password2, setPassword2] = React.useState();
  const [email, setEmail] = React.useState();
  const [firstName, setFirstName] = React.useState();
  const [lastName, setLastName] = React.useState();
  const ctx = useContext(DataContext);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword2 = () => setShowPassword2((show2) => !show2);
  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };
  const loginHandler = async () => {
    // try {
    //     if (!email || !password || !firstName || !lastName) {
    //         return alert("Please fill all the fields")
    //     }
    //     if (password !== password2) {
    //         return alert("Please enter the same password")
    //     }
    //     const { data } = await axios.post("https://vehicle-backend-final2.vercel.app/signup", {
    //         email: email.toLowerCase(), password: password.toLowerCase(), firstName: firstName.toLowerCase(), lastName: lastName.toLowerCase()
    //     }, { headers: { "Content-Type": "application/json" } })
    //     console.log(data)
    //     localStorage.setItem("isLoggedIn", 1)
    //     localStorage.setItem("access", data.token.access_token)
    //     ctx.apiCall()
    //     navigate("/Dashboard")
    // } catch (err) {
    //     alert(err.response.data.msg)
    // }
  };
  return (
    <>
      <div className="login">
        <div className="l1 col-md-5">
          <img src="loginimg.png" alt="" />
        </div>
        <div className="l2 col-md-7">
          <h4 className="text-center mt-2">Welcome to</h4>
          <h2 className="text-center mt-2" style={{ color: "#2F10EB" }}>
            VEHICLE MAINTAINENCE TRACKER
          </h2>
          <div className="logholder">
            <NavLink to="/Login">
              <h4 id="loginbtn">Login</h4>
            </NavLink>
            <NavLink to="/Signup" id="border">
              <h4 id="signupbtn">Signup</h4>
            </NavLink>
          </div>
          <div className="logform">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "95%" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="First Name"
                variant="standard"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <TextField
                id="standard-basic"
                label="Last Name"
                variant="standard"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              <TextField
                id="standard-basic"
                label="Email Adress"
                variant="standard"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {/* <InputLabel htmlFor="standard-adornment-password" id="pass" > Passwords</InputLabel> */}
              <Input
                placeholder="Create Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />

              <Input
                placeholder="Confirm Password"
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
                id="standard-adornment-password"
                type={showPassword2 ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword2}
                      onMouseDown={handleMouseDownPassword2}
                    >
                      {showPassword2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <button
                id="submit"
                type="button"
                onClick={loginHandler}
                className="pt-2"
              >
                Sign up
              </button>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
