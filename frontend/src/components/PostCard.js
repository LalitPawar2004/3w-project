import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import axiosInstance from "../utils/axiosInstance";

const PostCard = ({ post, onUpdate }) => {
  const [commentText, setCommentText] = useState("");
  const [loadingLike, setLoadingLike] = useState(false);
  const [loadingComment, setLoadingComment] = useState(false);

  const handleLike = async () => {
    try {
      setLoadingLike(true);
      const response = await axiosInstance.post(`/api/posts/${post._id}/like`);
      onUpdate(response.data); // update parent feed
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLike(false);
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    try {
      setLoadingComment(true);
      const response = await axiosInstance.post(
        `/api/posts/${post._id}/comment`,
        { text: commentText }
      );
      onUpdate(response.data);
      setCommentText("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingComment(false);
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      {post.image && (
        <CardMedia
          component="img"
          height="200"
          image={`${process.env.REACT_APP_BASE_URL}/${post.image}`}
          alt="post"
        />
      )}
      <CardContent>
        <Typography variant="h6">@{post.user?.username || "Unknown"}</Typography>
        {post.text && <Typography sx={{ mt: 1 }}>{post.text}</Typography>}

        <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
          <IconButton
            color={post.isLiked ? "error" : "default"}
            onClick={handleLike}
            disabled={loadingLike}
          >
            <FavoriteIcon />
          </IconButton>
          <Typography>{post.likes?.length || 0}</Typography>

          <IconButton sx={{ ml: 2 }}>
            <ChatBubbleOutlineIcon />
          </IconButton>
          <Typography>{post.comments?.length || 0}</Typography>
        </div>

        {/* Comment input */}
        <div style={{ marginTop: 10 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ mt: 1 }}
            onClick={handleComment}
            disabled={loadingComment}
          >
            Comment
          </Button>
        </div>

        {/* Comments list */}
        {post.comments?.length > 0 && (
          <div style={{ marginTop: 10 }}>
            {post.comments.map((c, idx) => (
              <Typography
                key={idx}
                variant="body2"
                sx={{ borderBottom: "1px solid #eee", py: 0.5 }}
              >
                <strong>@{c.username}:</strong> {c.text}
              </Typography>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;
