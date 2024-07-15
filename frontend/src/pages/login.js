import React from "react";
import { styled } from "@mui/material/styles";
import { Theme } from "../assets/theme.js";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import apiPost, { apiCheckLogin } from "../utilities/apiCall";

const CssTextField = styled(TextField)({
  label: {
    color: "#fff",
  },
  "&.MuiTextField-root": {
    backgroundColor: "#165C3F",
  },
  "& label.Mui-focused": {
    color: "#fff",
  },
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    "& fieldset": {
      borderColor: "#000",
    },
    "&:hover fieldset": {
      borderColor: "#fff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff",
    },
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
});

const Login = () => {
  let [a, setA] = React.useState(null);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!a) {
      apiCheckLogin(setA);
    } else {
      if (!a.err) {
        if (a.user.Role === "admin") navigate("/dashboard");
        else navigate("/");
      }
    }
  }, [a]);
  let [Phone, setPhone] = React.useState("");
  let [Password, setPassword] = React.useState("");
  let [user, setUser] = React.useState(null);
  React.useEffect(() => {
    if (user) {
      if (!user.err) {
        console.log(user);
        if (user.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }
    }
  }, [user]);
  async function loginToApp(e) {
    e.preventDefault();
    if (Phone && Password) {
      if (Phone.length < 10) {
        alert("Phone number must be 10 digits");
        return;
      } else {
        await apiPost("auth/login", { Phone, Password }, setUser);
      }
    }
  }
  return (
    <>
      <Theme>
        <Grid container justifyContent="center">
          <Grid item mobile={12} tablet={8.5} laptop={5}>
            <Box
              component="form"
              onSubmit={(e) => {
                loginToApp(e);
              }}
              sx={{
                width: "100%",
                minHeight: { mobile: "100vh", tablet: "auto", laptop: "auto" },
                backgroundColor: {
                  mobile: "primary.main",
                  tablet: "secondary.main",
                  laptop: "secondary.main",
                },
                my: "50vh",
                p: 5,
                py: { mobile: 20, tablet: 5, laptop: 5 },
                transform: "translateY(-50%)",
                overflow: "hidden",
              }}
            >
             
    </>
  );
};

export default Login;
