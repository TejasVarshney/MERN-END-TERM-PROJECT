import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Blog from "./Blog";
import config from "../config";
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  InputAdornment,
  IconButton,
  Collapse
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const Blogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [showSearchBar, setShowSearchBar] = useState(false);
  
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
        const blogsArray = data?.blogs || data?.data?.blogs || [];
        setAllBlogs(blogsArray);
      })
      .catch((err) => {
        setError(err?.message || "Failed to fetch blogs");
        setAllBlogs([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter and sort blogs
  const filteredAndSortedBlogs = useMemo(() => {
    let filtered = allBlogs.filter((blog) => {
      const searchLower = searchTerm.toLowerCase();
      const blogDate = new Date(blog.date).toLocaleDateString().toLowerCase();
      return (
        blog.title.toLowerCase().includes(searchLower) ||
        (blog.user?.name && blog.user.name.toLowerCase().includes(searchLower)) ||
        blogDate.includes(searchLower)
      );
    });

    // Sort blogs - always by latest first
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    return filtered;
  }, [allBlogs, searchTerm]);

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

  if (allBlogs.length === 0) {
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
      <Box sx={{ mb: 4, position: 'relative' }}>
        {/* Transforming Search Button/Bar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mb: 2,
            position: 'relative',
            zIndex: 10
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              width: showSearchBar ? { xs: '100%', sm: '400px' } : '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #0F4C75 0%, #3282B8 100%)',
              borderRadius: showSearchBar ? '12px' : '50px',
              padding: showSearchBar ? '0 16px' : '0',
              boxShadow: '0 8px 24px rgba(15, 76, 117, 0.3)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              overflow: 'hidden',
              '&:hover': {
                boxShadow: '0 12px 32px rgba(15, 76, 117, 0.4)',
              }
            }}
          >
            {/* Search Input */}
            <TextField
              fullWidth
              placeholder={showSearchBar ? "Search blogs by title, content, or author..." : ""}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={() => !showSearchBar && setShowSearchBar(true)}
              InputProps={{
                startAdornment: showSearchBar ? (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'white', mr: 1 }} />
                  </InputAdornment>
                ) : null,
              }}
              sx={{
                display: showSearchBar ? 'block' : 'none',
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  border: 'none',
                  backgroundColor: 'transparent',
                  height: '56px',
                  fontSize: '14px',
                  color: 'white',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  padding: 0,
                  color: 'white',
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    opacity: 1,
                  }
                }
              }}
            />

            {/* Search Button Icon */}
            <IconButton
              onClick={() => setShowSearchBar(!showSearchBar)}
              sx={{
                color: 'white',
                width: '56px',
                height: '56px',
                minWidth: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
                '&:active': {
                  transform: 'scale(0.95)',
                }
              }}
            >
              {showSearchBar ? <CloseIcon /> : <SearchIcon />}
            </IconButton>
          </Box>
        </Box>

        {/* Blogs List */}
        {filteredAndSortedBlogs.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '40vh',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <Typography 
              variant="h6" 
              sx={{
                color: '#6B7280',
                fontWeight: '500'
              }}
            >
              No blogs match your search criteria
            </Typography>
            <Typography 
              variant="caption" 
              sx={{
                color: '#9CA3AF'
              }}
            >
              Try adjusting your search terms or filters
            </Typography>
          </Box>
        ) : (
          <Box>
            {filteredAndSortedBlogs.map((blog) => (
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
        )}
      </Box>
    </Container>
  );
};

export default Blogs;
