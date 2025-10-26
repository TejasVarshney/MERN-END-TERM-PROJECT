import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import config from "../config";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./utils";
import placeholderImg from "../../src/placeholder.jpg"
import PublishIcon from "@mui/icons-material/Publish";
import CancelIcon from "@mui/icons-material/Cancel";

const labelStyles = { mb: 1.5, mt: 2.5, fontSize: "15px", fontWeight: "600", color: '#0F4C75' };

const AddBlogs = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios
      .post(`${config.BASE_URL}/api/blogs/add`, {
        title: inputs.title,
        desc: inputs.description,
        img: inputs.imageURL.trim() === "" ? placeholderImg : inputs.imageURL,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => {
        setIsLoading(false);
        navigate("/blogs");
      })
      .catch(() => setIsLoading(false));
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
          maxWidth={700}
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
          <Box sx={{ mb: 3, textAlign: 'center' }}>
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
              📝 Write Your Story
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#6B7280',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Share your ideas and inspire the community
            </Typography>
          </Box>

          {/* Title Field */}
          <Box>
            <InputLabel sx={labelStyles}>
              Blog Title
            </InputLabel>
            <TextField
              fullWidth
              name="title"
              onChange={handleChange}
              value={inputs.title}
              placeholder="Enter an engaging title..."
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
            <InputLabel sx={labelStyles}>
              Blog Content
            </InputLabel>
            <TextareaAutosize
              name="description"
              onChange={handleChange}
              minRows={10}
              value={inputs.description}
              placeholder="Write your blog content here... Make it engaging!"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid #E5E7EB',
                fontFamily: 'inherit',
                fontSize: '14px',
                color: '#1A1A1A',
                backgroundColor: '#f7fbff',
                resize: 'vertical',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#0F4C75';
                e.target.style.boxShadow = '0 0 0 3px rgba(15, 76, 117, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#E5E7EB';
                e.target.style.boxShadow = 'none';
              }}
            />
          </Box>

          {/* Image URL Field */}
          <Box>
            <InputLabel sx={labelStyles}>
              Cover Image URL (Optional)
            </InputLabel>
            <TextField
              fullWidth
              name="imageURL"
              onChange={handleChange}
              value={inputs.imageURL}
              placeholder="Paste image URL here..."
              variant="outlined"
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
            {inputs.imageURL && (
              <Box 
                sx={{ 
                  mt: 2,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 8px rgba(15, 76, 117, 0.1)',
                  border: '2px solid #E5E7EB'
                }}
              >
                <img 
                  src={inputs.imageURL} 
                  alt="Preview" 
                  style={{ 
                    width: '100%', 
                    height: '250px', 
                    objectFit: 'cover',
                    borderRadius: '6px'
                  }} 
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </Box>
            )}
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              startIcon={<PublishIcon />}
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
              {isLoading ? "Publishing..." : "Publish Blog"}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/blogs")}
              startIcon={<CancelIcon />}
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
      </form>
    </Box>
  );
};

export default AddBlogs;
