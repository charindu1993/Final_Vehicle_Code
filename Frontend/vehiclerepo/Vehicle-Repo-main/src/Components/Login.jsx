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

function Login() {
  const ctx = useContext(DataContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState();
  const [email, setEmail] = React.useState();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const loginHandler = () => {
    if (!email || !password) {
      alert("Fill the required fields");
    } else {
      axios
        .post(
          "http://localhost:8001/login",
          {
            userEmail: email.toLowerCase(),
            userPassword: password.toLowerCase(),
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then(({ data }) => {
          console.log(data);
          ctx.apiCall(data);
          localStorage.setItem("isLoggedIn", 1);
          navigate("/Dashboard");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
            <h4 id="loginbtn" style={{ color: "#2A0970 " }}>
              Login
            </h4>
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
                label="Email Adress"
                variant="standard"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Input
                placeholder="Password"
                onChange={(value) => {
                  setPassword(value.target.value);
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
              <button
                id="submit"
                type="button"
                onClick={loginHandler}
                className="pt-2"
              >
                Login
              </button>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
