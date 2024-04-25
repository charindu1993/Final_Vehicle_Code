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

function AdminLogin() {
  // Accessing context and navigation hook
  const ctx = useContext(DataContext);
  const navigate = useNavigate();

  // State variables for password visibility and admin credentials
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const adminCredentials = {
    username: "charindu578",
    password: "charindu1122",
  };

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Function to handle admin login
  const adminLoginHandler = async () => {
    try {
      // Check if entered credentials match the static admin credentials
      if (
        email === adminCredentials.username &&
        password === adminCredentials.password
      ) {
        // Set access token in local storage and redirect to Admin Dashboard
        localStorage.setItem("isAdminLoggedIn", 1);
        navigate("/AdminDashboard");
      } else {
        // If credentials do not match, display error message
        alert("Invalid admin credentials. Please try again.");
      }
    } catch (err) {
      // Handling admin login errors
      console.log(err);
      alert("Error occurred during admin login. Please try again later.");
    }
  };

  // Prevent default behavior on password visibility click
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // JSX return
  return (
    <>
      <div className="login">
        {/* Logo */}
        <div className="l1 col-md-5">
          <img src="loginimg.png" alt="" />
        </div>
        {/* Admin Login form */}
        <div className="l2 col-md-7">
          <h4 className="text-center mt-2">Admin Login</h4>
          {/* Admin Login form */}
          <div className="logform">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "95%" },
              }}
              noValidate
              autoComplete="off"
            >
              {/* Email input */}
              <TextField
                id="standard-basic"
                label="Username"
                variant="standard"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {/* Password input */}
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
              {/* Admin Login button */}
              <button
                id="submit"
                type="button"
                onClick={adminLoginHandler}
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

export default AdminLogin;
