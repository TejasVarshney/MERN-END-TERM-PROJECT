/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { Box, Typography, Container, CircularProgress } from "@mui/material";
import config from "../config";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/blogs/user/${id}`);
      const data = await res?.data;
      return data;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    sendRequest()
      .then((data) => {
        // Handle ApiResponse wrapper: { statusCode, data: { user: { blogs: [] } }, message, success }
        const blogsArray = data?.data?.user?.blogs || data?.user?.blogs || [];
        setBlogs(blogsArray);
      })
      .catch((err) => {
        setError(err?.message || "Failed to fetch your blogs");
        setBlogs([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (blogId) => {
    axios.delete(`${config.BASE_URL}/api/blogs/${blogId}`).then(() => {
      sendRequest()
        .then((data) => {
          const blogsArray = data?.data?.user?.blogs || data?.user?.blogs || [];
          setBlogs(blogsArray);
        })
        .catch((err) => {
          setError("Failed to refresh blogs");
        });
    });
  };

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
        <CircularProgress sx={{ color: '#3282B8' }} />
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
          <Typography variant="h5" sx={{ color: '#EF476F', fontWeight: 'bold' }}>
            Error Loading Blogs
          </Typography>
          <Typography variant="body2" sx={{ color: '#6B7280' }}>
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
          <Typography variant="h5" sx={{ color: '#0F4C75', fontWeight: 'bold' }}>
            No blogs yet
          </Typography>
          <Typography variant="body2" sx={{ color: '#6B7280' }}>
            Start creating your first blog!
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box>
        {blogs.map((blog) => (
          <Blog
            key={blog._id}
            id={blog._id}
            isUser={true}
            title={blog.title}
            desc={blog.desc}
            img={blog.img}
            user={blog.user?.name || "Unknown"}
            date={blog.date ? new Date(blog.date).toLocaleDateString() : ""}
          />
        ))}
      </Box>
    </Container>
  );
};

export default UserBlogs;
