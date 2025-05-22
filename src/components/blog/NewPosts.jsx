import React from 'react'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { getAllPosts } from "../../services/postService";

const NewPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await getAllPosts(1, 5); // Get latest 5 posts
        setPosts(response.posts);
      } catch (error) {
        console.error("Failed to fetch latest posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Latest Posts</h2>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="mt-2 h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Latest Posts</h2>
      <div className="space-y-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            className="flex items-start space-x-4 group"
          >
            {post.featured_image && (
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                {post.title}
              </h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <span>{post.user?.username}</span>
                <span className="mx-2">•</span>
                <time>{format(new Date(post.created_at), "MMM dd, yyyy")}</time>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link
        to="/"
        className="mt-6 inline-block text-primary-600 hover:text-primary-700 font-medium"
      >
        View all posts →
      </Link>
    </div>
  );
};

export default NewPosts;
