// src/pages/Login.js
import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/api/users/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      setMessage("Login successful!");
      setTimeout(() => navigate("/feed"), 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom align="center">
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          margin="normal"
          onChange={handleChange}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Login
        </Button>
      </Box>
      {message && (
        <Typography color="text.secondary" align="center" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Container>
  );
};

export default Login;
