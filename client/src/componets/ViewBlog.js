import { Container, Box, Typography, CircularProgress, Card, CardMedia, Chip, Avatar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import config from "../config";

const ViewBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${config.BASE_URL}/api/blogs/${id}`);
        const data = res.data;
        
        // Handle both data.blog and data.data.blog
        const blogData = data.blog || data.data?.blog || data.data || data;
        setBlog(blogData);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load blog");
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh'
        }}
      >
        <CircularProgress 
          sx={{
            color: '#3282B8'
          }}
        />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <Typography 
            variant="h5" 
            sx={{
              color: '#EF476F',
              fontWeight: 'bold'
            }}
          >
            Error Loading Blog
          </Typography>
          <Typography 
            variant="body2" 
            sx={{
              color: '#6B7280'
            }}
          >
            {error}
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <Typography 
            variant="h5" 
            sx={{
              color: '#0F4C75',
              fontWeight: 'bold'
            }}
          >
            Blog Not Found
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Card
          sx={{
            borderRadius: "12px",
            background: 'white',
            boxShadow: '0 2px 8px rgba(15, 76, 117, 0.08)',
            border: '1px solid #E5E7EB',
            overflow: 'hidden',
          }}
        >
          {/* Image Section */}
          {blog.img && (
            <Box
              sx={{
                position: 'relative',
                overflow: 'hidden',
                height: '400px',
                background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2ff 100%)'
              }}
            >
              <CardMedia 
                component="img" 
                height="400" 
                image={blog.img} 
                alt={blog.title}
                sx={{
                  objectFit: 'cover',
                }}
              />
            </Box>
          )}

          {/* Content Section */}
          <Box sx={{ p: 4 }}>
            {/* Title */}
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 'bold',
                color: '#0F4C75',
                mb: 2,
                fontSize: { xs: '24px', sm: '32px', md: '36px' }
              }}
            >
              {blog.title}
            </Typography>

            {/* Author and Date */}
            <Box display="flex" gap={2} alignItems="center" sx={{ mb: 3, pb: 2, borderBottom: '1px solid #E5E7EB' }}>
              <Avatar
                sx={{ 
                  bgcolor: 'linear-gradient(135deg, #0F4C75 0%, #3282B8 100%)',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  width: 48,
                  height: 48
                }}
              >
                {blog.user?.name ? blog.user.name.charAt(0).toUpperCase() : "?"}
              </Avatar>
              <Box>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#1A1A1A', 
                    fontWeight: '600'
                  }}
                >
                  {blog.user?.name || "Unknown Author"}
                </Typography>
                {blog.date && (
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#6B7280'
                    }}
                  >
                    {new Date(blog.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Description */}
            <Typography
              variant="body1"
              sx={{
                color: '#404040',
                lineHeight: '1.8',
                fontSize: '16px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
            >
              {blog.desc || blog.description}
            </Typography>

            {/* Back Button */}
            <Box sx={{ mt: 4 }}>
              <Typography
                onClick={() => navigate('/blogs')}
                sx={{
                  color: '#3282B8',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'inline-block',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: '#0F4C75'
                  }
                }}
              >
                ← Back to Blogs
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default ViewBlog;
