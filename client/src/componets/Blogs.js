import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import config from "../config";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const sendRequest = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/blogs`);
      const responseBody = res.data; // ApiResponse: { statusCode, data, message, success }
      return responseBody.data; // { blogs }
    } catch (err) {
      console.error("Blogs request error:", err);
      const apiError = err?.response?.data;
      // If server returns 404 for no blogs, treat as empty list instead of throwing
      if (apiError && apiError.statusCode === 404) {
        return { blogs: [] };
      }
      throw apiError || err;
    }
  };

  useEffect(() => {
    sendRequest()
      .then((data) => setBlogs(data?.blogs || []))
      .catch((err) => {
        console.error("Failed to fetch blogs:", err);
        // optionally show a user-facing message instead of crashing
        // alert(err?.message || "Failed to fetch blogs");
        setBlogs([]);
      });
  }, []);
  console.log(blogs);
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            desc={blog.desc}
            img={blog.img}
            user={blog.user.name}
            date={new Date(blog.date).toLocaleDateString()}
          />
        ))}
    </div>
  );
};

export default Blogs;
