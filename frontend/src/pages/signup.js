import React from "react";
import { styled } from "@mui/material/styles";
import { Theme } from "../assets/theme.js";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

const Signup = () => {
  let navigate = useNavigate();
  let [Username, setUsername] = React.useState("");
  let [Password, setPassword] = React.useState("");
  let [confirmPassword, setConfirmPassword] = React.useState("");
  let [Phone, setPhone] = React.useState("");
  let [user, setUser] = React.useState(null);
  let [a, setA] = React.useState(null);
  React.useEffect(() => {
    if (!a) {
      apiCheckLogin(setA);
    } else {
      if (!a.err) {
        if(a.user.Role === "admin") navigate("/dashboard");
        else navigate("/");
      }
    }
  }, [a]);
  async function handleSubmit(e) {
    e.preventDefault();
    if (Username && Password && confirmPassword && Phone) {
      console.log(Username, Password, confirmPassword, Phone);
      if (Password === confirmPassword) {
        await apiPost("auth/signup", { Username, Phone, Password }, setUser);
      }
    }
  }
  React.useEffect(() => {
    if (user) {
      if (!user.err) navigate("/");
    }
  }, [user]);
  return (
    <>
      <Theme>
        <Grid container justifyContent="center">
          <Grid item mobile={12} tablet={8.5} laptop={5}>
            <Box
              component="form"
              onSubmit={(e) => {
                handleSubmit(e);
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
                py: { mobile: 10, tablet: 5, laptop: 5 },
                transform: "translateY(-50%)",
                overflow: "hidden",
              }}
            >
              <svg
                className="w-7 absolute inset-0 mt-5 ml-5"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                onClick={() => window.history.back()}
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
              </svg>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Theme>
    </>
  );
};

export default Signup;
