import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate, useLocation } from "react-router-dom";
import config from "../config";

const Login = () => {
  const location = useLocation();
  const naviagte = useNavigate();
  const dispath = useDispatch();
  const { isSignupButtonPressed } = location.state || {};

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(isSignupButtonPressed || false);
  
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  
  useEffect(() => {
    setIsSignup(isSignupButtonPressed);
  }, [isSignupButtonPressed]);
  
  const sendRequest = async (type = "login") => {
    console.log("inside send req");
    console.log(`${config.BASE_URL}/api/users/${type}`);
    try {
      const res = await axios.post(`${config.BASE_URL}/api/users/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });

      const responseBody = res.data;
      console.log("return");
      console.log(responseBody);
      return responseBody.data;
    } catch (err) {
      console.error("Request error:", err);
      const apiError = err?.response?.data || { message: err.message || "Request failed" };
      throw apiError;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then((data) => {
          if (!data || !data.user) throw new Error("Unexpected response from server");
          localStorage.setItem("userId", data.user._id);
        })
        .then(() => dispath(authActions.login()))
        .then(() => naviagte("/blogs"))
        .catch((err) => {
          const message = err?.message || err?.data?.message || "Signup failed";
          console.error("Signup failed:", err);
          alert(message);
        });
    } else {
      sendRequest()
        .then((data) => {
          if (!data || !data.user) throw new Error("Unexpected response from server");
          localStorage.setItem("userId", data.user._id);
        })
        .then(() => dispath(authActions.login()))
        .then(() => naviagte("/blogs"))
        .catch((err) => {
          const message = err?.message || err?.data?.message || "Login failed";
          console.error("Login failed:", err);
          alert(message);
        });
    }
  };
  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
        background: 'linear-gradient(135deg, #f7fbff 0%, #e0f2ff 50%, #f0f9ff 100%)',
        padding: '20px'
      }}
    >
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box
          maxWidth={420}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            margin: "auto",
            padding: '40px',
            borderRadius: '16px',
            background: 'white',
            boxShadow: '0 4px 12px rgba(15, 76, 117, 0.1)',
            border: '1px solid #E5E7EB',
            animation: 'slideUp 0.5s ease-out'
          }}
        >
          {/* Header */}
          <Box
            sx={{
              mb: 3,
              textAlign: 'center',
              animation: 'slideIn 0.5s ease'
            }}
          >
            <Typography 
              variant="h3" 
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(90deg, #0F4C75 0%, #3282B8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
                fontSize: '32px'
              }}
            >
              {isSignup ? "Join BlogHub" : "Welcome Back"}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#6B7280',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              {isSignup 
                ? "Create your account to start sharing stories" 
                : "Sign in to your BlogHub account"}
            </Typography>
          </Box>

          {/* Name Field - Only for Signup */}
          {isSignup && (
            <TextField
              fullWidth
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Full Name"
              margin="normal"
              variant="outlined"
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: '#f7fbff',
                  '&:hover fieldset': {
                    borderColor: '#3282B8',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#0F4C75',
                    borderWidth: '2px'
                  },
                },
                '& .MuiOutlinedInput-input::placeholder': {
                  color: '#9CA3AF',
                  opacity: 1,
                }
              }}
            />
          )}

          {/* Email Field */}
          <TextField
            fullWidth
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type="email"
            placeholder="Email Address"
            margin="normal"
            variant="outlined"
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: '#f7fbff',
                '&:hover fieldset': {
                  borderColor: '#3282B8',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#0F4C75',
                  borderWidth: '2px'
                },
              },
              '& .MuiOutlinedInput-input::placeholder': {
                color: '#9CA3AF',
                opacity: 1,
              }
            }}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type="password"
            placeholder="Password"
            margin="normal"
            variant="outlined"
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: '#f7fbff',
                '&:hover fieldset': {
                  borderColor: '#3282B8',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#0F4C75',
                  borderWidth: '2px'
                },
              },
              '& .MuiOutlinedInput-input::placeholder': {
                color: '#9CA3AF',
                opacity: 1,
              }
            }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              borderRadius: '8px', 
              marginTop: '24px',
              padding: '12px',
              fontWeight: 'bold',
              fontSize: '16px',
              background: 'linear-gradient(90deg, #0F4C75 0%, #3282B8 100%)',
              textTransform: 'none',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 16px rgba(15, 76, 117, 0.3)'
              }
            }}
          >
            {isSignup ? "Create Account" : "Sign In"}
          </Button>

          {/* Divider */}
          <Box sx={{ my: 2, textAlign: 'center', color: '#D1D5DB', fontSize: '14px' }}>
            — or —
          </Box>

          {/* Toggle Button */}
          <Button
            onClick={() => setIsSignup(!isSignup)}
            fullWidth
            sx={{ 
              borderRadius: '8px',
              textTransform: 'none',
              color: '#3282B8',
              fontWeight: '600',
              fontSize: '14px',
              border: '2px solid #E5E7EB',
              backgroundColor: '#f7fbff',
              '&:hover': {
                backgroundColor: '#f0f9ff',
                borderColor: '#3282B8'
              }
            }}
          >
            {isSignup 
              ? "Already have an account? Sign In" 
              : "Create a new account"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
