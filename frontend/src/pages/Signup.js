// src/pages/Signup.js
import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
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
      const res = await axiosInstance.post("/api/users/register", formData);
      setMessage("Signup successful! Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom align="center">
        Signup
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          name="username"
          margin="normal"
          onChange={handleChange}
        />
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
          Sign Up
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

export default Signup;
