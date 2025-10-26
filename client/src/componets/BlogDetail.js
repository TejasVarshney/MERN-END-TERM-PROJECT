import { Button, InputLabel, TextField, Typography, Container, Box, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from "../config";

const labelStyles = { mb: 1.5, mt: 2.5, fontSize: "15px", fontWeight: "600", color: '#0F4C75' };

const BlogDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [inputs, setInputs] = useState({ title: "", desc: "" });
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchDetails = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${config.BASE_URL}/api/blogs/${id}`);
      const data = res.data;
      
      // Handle both data.blog and data directly
      const blogData = data.blog || data.data || data;
      setBlog(blogData);
      setInputs({
        title: blogData.title || "",
        desc: blogData.desc || blogData.description || "",
      });
    } catch (err) {
      // Handle error silently
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const sendRequest = async () => {
    try {
      setIsSubmitting(true);
      const res = await axios.put(`${config.BASE_URL}/api/blogs/update/${id}`, {
        title: inputs.title,
        desc: inputs.desc,
      });
      return res.data;
    } catch (err) {
      alert("Failed to update blog");
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => {
        navigate("/myBlogs");
      })
      .catch((err) => {
        // Error already shown in sendRequest
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
      {blog ? (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Container maxWidth={600}>
            <Box
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
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(90deg, #0F4C75 0%, #3282B8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 3,
                  textAlign: 'center',
                  fontSize: '32px'
                }}
              >
                Update Blog
              </Typography>

              {/* Title Field */}
              <Box>
                <InputLabel sx={labelStyles}>Title</InputLabel>
                <TextField
                  fullWidth
                  name="title"
                  onChange={handleChange}
                  value={inputs.title}
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
                  }}
                />
              </Box>

              {/* Description Field */}
              <Box>
                <InputLabel sx={labelStyles}>Description</InputLabel>
                <TextField
                  fullWidth
                  name="desc"
                  onChange={handleChange}
                  value={inputs.desc}
                  variant="outlined"
                  multiline
                  rows={8}
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
                  }}
                />
              </Box>

              {/* Buttons */}
              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    borderRadius: '8px',
                    padding: '12px',
                    fontWeight: 'bold',
                    fontSize: '15px',
                    background: 'linear-gradient(90deg, #0F4C75 0%, #3282B8 100%)',
                    textTransform: 'none',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 16px rgba(15, 76, 117, 0.3)'
                    },
                    '&:disabled': {
                      opacity: 0.6
                    }
                  }}
                >
                  {isSubmitting ? "Updating..." : "Update Blog"}
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => navigate("/myBlogs")}
                  sx={{
                    borderRadius: '8px',
                    padding: '12px',
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: '#3282B8',
                    borderColor: '#3282B8',
                    textTransform: 'none',
                    backgroundColor: '#f7fbff',
                    '&:hover': {
                      backgroundColor: '#e0f2ff',
                      borderColor: '#0F4C75',
                      color: '#0F4C75'
                    }
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Container>
        </form>
      ) : (
        <Typography textAlign="center" mt={5} variant="h5">
          Loading blog details...
        </Typography>
      )}
    </Box>
  );
};

export default BlogDetail;
