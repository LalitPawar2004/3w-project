import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import PostCard from "../components/PostCard";
import { Button, Container, Typography, CircularProgress } from "@mui/material";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (pageNum = 1) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/api/posts?page=${pageNum}&limit=5`);
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...data]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const loadMore = () => setPage((prev) => prev + 1);

  const handlePostUpdate = (updatedPost) => {
    setPosts((prevPosts) => prevPosts.map((p) => (p._id === updatedPost._id ? updatedPost : p)));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        🌍 Social Feed
      </Typography>

      {posts.length === 0 && !loading && <Typography>No posts yet. Be the first to create one!</Typography>}

      {posts.map((post) => (
        <PostCard key={post._id} post={post} onUpdate={handlePostUpdate} />
      ))}

      {loading && <CircularProgress sx={{ display: "block", mx: "auto", mt: 2 }} />}

      {hasMore && !loading && (
        <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={loadMore}>
          Load More
        </Button>
      )}
    </Container>
  );
};

export default Feed;
