import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import PeopleIcon from "@mui/icons-material/People";
import ShareIcon from "@mui/icons-material/Share";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <CreateIcon sx={{ fontSize: 40 }} />,
      title: "Easy Writing",
      description: "Write and publish your blogs with a simple, intuitive interface.",
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      title: "Community",
      description: "Connect with writers and readers from around the world.",
    },
    {
      icon: <ShareIcon sx={{ fontSize: 40 }} />,
      title: "Share Your Voice",
      description: "Share your thoughts, ideas, and stories with everyone.",
    },
    {
      icon: <SearchIcon sx={{ fontSize: 40 }} />,
      title: "Discover Content",
      description: "Explore amazing blogs and articles from our community.",
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: "Grow Your Audience",
      description: "Reach more people and build your personal brand.",
    },
    {
      icon: <LightbulbIcon sx={{ fontSize: 40 }} />,
      title: "Inspire Others",
      description: "Share your knowledge and inspire the next generation.",
    },
  ];

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #0F4C75 0%, #3282B8 50%, #00D4FF 100%)",
          color: "white",
          py: { xs: 8, md: 12 },
          px: { xs: 2, md: 0 },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-50%",
            right: "-10%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            zIndex: 0,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-30%",
            left: "-5%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(50, 130, 184, 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          {/* Main Headline */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "36px", md: "56px" },
              fontWeight: "bold",
              mb: 2,
              lineHeight: 1.2,
              animation: "slideUp 0.6s ease-out",
            }}
          >
            Welcome to <span style={{ color: "#FFD700" }}>BlogHub</span>
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "18px", md: "24px" },
              mb: 4,
              fontWeight: 300,
              color: "rgba(255, 255, 255, 0.9)",
              animation: "slideUp 0.8s ease-out",
            }}
          >
            Share your stories, inspire the world, and build your community
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "14px", md: "16px" },
              mb: 4,
              color: "rgba(255, 255, 255, 0.85)",
              maxWidth: "600px",
              mx: "auto",
              lineHeight: 1.8,
              animation: "slideUp 1s ease-out",
            }}
          >
            BlogHub is a modern blogging platform where creators, writers, and thinkers
            come together to share their knowledge, experiences, and passions with a global
            audience.
          </Typography>

          {/* CTA Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            sx={{
              mt: 4,
              animation: "slideUp 1.2s ease-out",
            }}
          >
            <Button
              onClick={() => navigate("/login", { state: { isSignupButtonPressed: true } })}
              variant="contained"
              sx={{
                background: "white",
                color: "#0F4C75",
                fontWeight: "bold",
                fontSize: "16px",
                padding: "14px 40px",
                borderRadius: "8px",
                textTransform: "none",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                "&:hover": {
                  background: "#F0F9FF",
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 32px rgba(0, 0, 0, 0.2)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Get Started Now
            </Button>

            <Button
              onClick={() => navigate("/login", { state: { isSignupButtonPressed: false } })}
              variant="outlined"
              sx={{
                borderColor: "white",
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                padding: "14px 40px",
                borderRadius: "8px",
                textTransform: "none",
                border: "2px solid white",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.1)",
                  transform: "translateY(-4px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Sign In
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          px: { xs: 2, md: 0 },
          background: "linear-gradient(135deg, #f7fbff 0%, #e0f2ff 50%, #f0f9ff 100%)",
        }}
      >
        <Container maxWidth="lg">
          {/* Section Title */}
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              mb: 2,
              fontWeight: "bold",
              color: "#0F4C75",
              fontSize: { xs: "32px", md: "42px" },
            }}
          >
            Why Choose BlogHub?
          </Typography>

          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              mb: 6,
              color: "#6B7280",
              maxWidth: "600px",
              mx: "auto",
              fontSize: "16px",
            }}
          >
            Discover a platform designed for creators, writers, and thought leaders to share
            their voice and connect with their audience.
          </Typography>

          {/* Features Grid */}
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(15, 76, 117, 0.08)",
                    border: "1px solid #E5E7EB",
                    background: "white",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 24px rgba(15, 76, 117, 0.15)",
                      borderColor: "#3282B8",
                    },
                    animation: `slideUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <CardContent sx={{ textAlign: "center", py: 4 }}>
                    <Box
                      sx={{
                        color: "#3282B8",
                        mb: 2,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: "#0F4C75",
                        mb: 1,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6B7280",
                        lineHeight: 1.6,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          px: { xs: 2, md: 0 },
          background: "linear-gradient(135deg, #f7fbff 0%, #e0f2ff 50%, #f0f9ff 100%)",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#0F4C75",
              mb: 2,
              fontSize: { xs: "28px", md: "40px" },
            }}
          >
            Ready to Share Your Story?
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#6B7280",
              mb: 4,
              fontSize: "16px",
              lineHeight: 1.8,
            }}
          >
            Join thousands of writers and start publishing your blogs today. It takes just a few
            minutes to get started.
          </Typography>

          <Button
            onClick={() => navigate("/login", { state: { isSignupButtonPressed: true } })}
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, #0F4C75 0%, #3282B8 100%)",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              padding: "14px 50px",
              borderRadius: "8px",
              textTransform: "none",
              boxShadow: "0 8px 24px rgba(15, 76, 117, 0.3)",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 12px 32px rgba(15, 76, 117, 0.4)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Start Your Journey
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: 4,
          px: { xs: 2, md: 0 },
          background: "#0D1B2A",
          color: "#9CA3AF",
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" sx={{ fontSize: "14px" }}>
            © 2025 BlogHub. All rights reserved. | Designed with ❤️ for writers everywhere.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
