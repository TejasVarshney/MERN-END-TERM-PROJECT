import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Chip,
} from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStyles } from "./utils";
import config from "../config";

const Blogs = ({ title, desc, img, user, isUser, id, date }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };
  
  const deleteRequest = async () => {
    const res = await axios
      .delete(`${config.BASE_URL}/api/blogs/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };
  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mb: 3,
        animation: 'fadeIn 0.5s ease-in'
      }}
    >
      <Card
        sx={{
          width: "90%",
          maxWidth: "720px",
          borderRadius: "12px",
          background: 'white',
          boxShadow: '0 2px 8px rgba(15, 76, 117, 0.08)',
          border: '1px solid #E5E7EB',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 24px rgba(15, 76, 117, 0.15)',
            borderColor: '#3282B8'
          },
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            height: '280px',
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2ff 100%)'
          }}
        >
          <CardMedia 
            component="img" 
            height="280" 
            image={img} 
            alt={title}
            sx={{
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
        </Box>

        {/* Header with Actions */}
        <CardHeader
          avatar={
            <Avatar
              sx={{ 
                bgcolor: 'linear-gradient(135deg, #0F4C75 0%, #3282B8 100%)',
                fontWeight: 'bold',
                fontSize: '18px',
                width: 40,
                height: 40
              }}
              aria-label="recipe"
            >
              {user ? user.charAt(0).toUpperCase() : ""}
            </Avatar>
          }
          title={
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                color: '#1A1A1A',
                fontSize: '18px',
                lineHeight: '1.4'
              }}
            >
              {title}
            </Typography>
          }
          subheader={
            <Box display="flex" gap={1} alignItems="center" sx={{ mt: 0.5 }}>
              <Typography variant="caption" sx={{ color: '#6B7280', fontWeight: '500' }}>
                by {user}
              </Typography>
              {date && (
                <Chip 
                  label={date} 
                  size="small"
                  sx={{
                    background: 'linear-gradient(135deg, #0F4C75 0%, #3282B8 100%)',
                    color: 'white',
                    fontWeight: '500',
                    fontSize: '11px',
                    height: '20px'
                  }}
                />
              )}
            </Box>
          }
          action={
            isUser && (
              <Box display="flex" gap={0.5}>
                <IconButton 
                  onClick={handleEdit}
                  size="small"
                  sx={{
                    color: '#FFD166',
                    backgroundColor: 'rgba(255, 209, 102, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 209, 102, 0.2)',
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  <ModeEditOutlineIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  onClick={handleDelete}
                  size="small"
                  sx={{
                    color: '#EF476F',
                    backgroundColor: 'rgba(239, 71, 111, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(239, 71, 111, 0.2)',
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  <DeleteForeverIcon fontSize="small" />
                </IconButton>
              </Box>
            )
          }
          sx={{
            background: 'linear-gradient(90deg, rgba(240, 249, 255, 0.5) 0%, rgba(224, 242, 255, 0.3) 100%)',
            borderBottom: '1px solid #E5E7EB',
            pb: 1.5
          }}
        />

        {/* Content */}
        <CardContent sx={{ pb: 2 }}>
          <Typography
            variant="body2"
            sx={{
              color: '#6B7280',
              lineHeight: '1.8',
              fontSize: '15px',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {desc}
          </Typography>
        </CardContent>

        {/* Read More Link */}
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography
            variant="caption"
            onClick={() => navigate(`/myBlogs/${id}`)}
            sx={{
              color: '#3282B8',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '13px',
              '&:hover': {
                textDecoration: 'underline',
                color: '#0F4C75'
              }
            }}
          >
            Read Full Blog →
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default Blogs;
