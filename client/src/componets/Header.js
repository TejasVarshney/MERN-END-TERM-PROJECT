import React, { useEffect,useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { authActions, setDarkmode } from "../store";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { lightTheme, darkTheme } from "../utils/theme";

const Header = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDarkmode);
  const theme = isDark ? darkTheme : lightTheme;

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [value, setValue] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedTab = localStorage.getItem("selectedTab");
    const savedTheme = localStorage.getItem("isDarkMode");
    if (savedTab !== null) {
      setValue(parseInt(savedTab, 10));
    }
    if (savedTheme !== null) {
      dispatch(setDarkmode(JSON.parse(savedTheme))); 
    }
  }, []);
  
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/blogs/add")) {
      setValue(2);
    } else if (path.startsWith("/myBlogs")) {
      setValue(1);
    } else if (path.startsWith("/blogs")) {
      setValue(0);
    } else {
      setValue(0); 
    }
  }, [location.pathname]);

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
    localStorage.setItem("selectedTab", newValue); 
  };

  const handleDarkModeToggle = () => {
    const newTheme = !isDark;
    localStorage.setItem("isDarkMode", newTheme); 
    dispatch(setDarkmode(newTheme)); 
  }

  const handleLoginClick = () => {
    navigate("/login", { state: { isSignupButtonPressed: false } });
  };

  const handleSignupClick = () => {
    navigate("/login", { state: { isSignupButtonPressed: true } });
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: isDark 
          ? 'linear-gradient(90deg, #0D1B2A 0%, #1F3A52 100%)'
          : 'linear-gradient(90deg, #0F4C75 0%, #3282B8 100%)',
        boxShadow: '0 4px 12px rgba(15, 76, 117, 0.15)',
        backdropFilter: 'blur(10px)',
        border: 'none',
        padding: '0 20px',
        position: 'relative',
        zIndex: 100
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', padding: '12px 0' }}>
        {/* Logo */}
        <Box display="flex" alignItems="center">
          <Typography 
            variant="h5" 
            sx={{
              fontWeight: 'bold',
              fontSize: '26px',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
            onClick={handleLogoClick}
          >
            📝 BlogHub
          </Typography>
        </Box>

        {/* Navigation Tabs */}
        {isLoggedIn && (
          <Box display="flex" marginLeft={"auto"} marginRight="auto">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={handleTabChange}
              sx={{
                '& .MuiTab-root': {
                  color: 'rgba(255,255,255,0.7)',
                  fontWeight: '600',
                  fontSize: '14px',
                  marginRight: '10px',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#00D4FF'
                  }
                },
                '& .Mui-selected': {
                  color: '#00D4FF !important'
                },
                '& .MuiTabs-indicator': {
                  background: '#00D4FF',
                  height: '3px'
                }
              }}
            >
              <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
              <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
              <Tab LinkComponent={Link} to="/blogs/add" label="Create" />
            </Tabs>
          </Box>
        )}

        {/* Right Actions */}
        <Box display="flex" alignItems="center" gap={1}>
          {!isLoggedIn && (
            <>
              <Button
                onClick={handleLoginClick}
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  borderRadius: '8px',
                  padding: '8px 18px',
                  border: '2px solid white',
                  backgroundColor: 'transparent',
                  textTransform: 'none',
                  fontSize: '14px',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Login
              </Button>
              <Button
                onClick={handleSignupClick}
                sx={{
                  fontWeight: "bold",
                  color: '#0F4C75',
                  borderRadius: '8px',
                  padding: '8px 18px',
                  background: 'white',
                  textTransform: 'none',
                  fontSize: '14px',
                  '&:hover': {
                    background: '#f0f0f0',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Sign Up
              </Button>
            </>
          )}

          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authActions.logout())}
              LinkComponent={Link}
              to="/login"
              sx={{ 
                borderRadius: '8px',
                padding: '8px 18px',
                fontWeight: 'bold',
                fontSize: '14px',
                color: '#0F4C75',
                background: 'white',
                textTransform: 'none',
                '&:hover': {
                  background: '#f0f0f0',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Logout
            </Button>
          )}

          <Box
            onClick={handleDarkModeToggle}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: "pointer",
              padding: "8px 10px",
              borderRadius: '8px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
                transform: 'rotate(20deg)'
              }
            }}
          >
            {isDark ? <LightModeIcon sx={{ color: 'white' }} /> : <DarkModeIcon sx={{ color: 'white' }} />}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
