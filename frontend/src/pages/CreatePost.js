import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text && !image) {
      setMessage("Please add text or image before posting.");
      return;
    }

    const formData = new FormData();
    formData.append("text", text);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      const res = await axiosInstance.post("/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message || "Post created successfully!");
      setText("");
      setImage(null);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setMessage("Error creating post. Try again!");
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        ✍️ Create New Post
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 2,
          p: 2,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <TextField
          label="What's on your mind?"
          multiline
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
        />

        <Button variant="outlined" component="label">
          Upload Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Button>

        {image && (
          <Typography variant="body2" color="text.secondary">
            Selected: {image.name}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Post"}
        </Button>

        {message && (
          <Typography
            variant="body2"
            color={message.includes("successfully") ? "green" : "red"}
            sx={{ mt: 1 }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default CreatePost;
