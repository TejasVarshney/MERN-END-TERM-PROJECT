import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import config from "../config";
import { Box, Typography, CircularProgress, Container } from "@mui/material";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const sendRequest = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/blogs`);
      const responseBody = res.data;
      return responseBody.data;
    } catch (err) {
      const apiError = err?.response?.data;
      if (apiError && apiError.statusCode === 404) {
        return { blogs: [] };
      }
      throw apiError || err;
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    sendRequest()
      .then((data) => {
        // Handle ApiResponse wrapper: { statusCode, data: { blogs: [] }, message, success }
        const blogsArray = data?.blogs || data?.data?.blogs || [];
        setBlogs(blogsArray);
      })
      .catch((err) => {
        setError(err?.message || "Failed to fetch blogs");
        setBlogs([]);
      })
      .finally(() => setLoading(false));
  }, []);
  
  console.log("Blogs state:", blogs);
  
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
            Error Loading Blogs
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

  if (blogs.length === 0) {
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
            No blogs found yet
          </Typography>
          <Typography 
            variant="body2" 
            sx={{
              color: '#6B7280'
            }}
          >
            Be the first to share your story!
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box>
        {blogs &&
          blogs.map((blog, index) => (
            <Blog
              key={blog._id}
              id={blog._id}
              isUser={localStorage.getItem("userId") === blog.user._id}
              title={blog.title}
              desc={blog.desc}
              img={blog.img}
              user={blog.user.name}
              date={new Date(blog.date).toLocaleDateString()}
            />
          ))}
      </Box>
    </Container>
  );
};

export default Blogs;
