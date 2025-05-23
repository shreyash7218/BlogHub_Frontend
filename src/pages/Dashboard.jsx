import React from "react";
import { formatDate } from "../utils/formatDate";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { format } from "date-fns";
import {
  FiEdit2,
  FiTrash2,
  FiPlusCircle,
  FiAlertCircle,
  FiCheckCircle,
  FiUser,
} from "react-icons/fi";
import { getUserPosts, deletePost } from "../services/postService";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const data = await getUserPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch user posts", error);
        setError("Failed to load your posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this post? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
      setMessage("Post deleted successfully");
    } catch (error) {
      console.error("Failed to delete post", error);
      setError("Failed to delete the post. Please try again.");
    }
  };

  const truncateTitle = (title, maxLength = 60) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength).trim() + "...";
  };

  return (
    <div className="pt-20">

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <FiUser className="w-8 h-8 text-primary-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {user?.username}
            </h2>

            <p className="text-gray-600">{user?.email}</p>

            <p className="text-sm text-gray-500">
            </p>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your blog posts and create new content
            </p>
          </div>

          <Link
            to="/create-post"
            className="mt-4 md:mt-0 btn-primary flex items-center justify-center"
          >
            <FiPlusCircle className="mr-2" />
            Create New Post
          </Link>
        </div>
      </div>

      {message && (
        <div className="bg-green-100 p-4 rounded-md flex items-center mb-6">
          <FiCheckCircle className="text-green-600 mr-3 flex-shrink-0" />
          <span className="text-green-700">{message}</span>
        </div>
      )}

      {error && (
        <div className="bg-red-100 p-4 rounded-md flex items-center mb-6">
          <FiAlertCircle className="text-red-600 mr-3 flex-shrink-0" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
              <div className="flex justify-end">
                <div className="h-8 bg-gray-300 rounded w-16 mr-2"></div>
                <div className="h-8 bg-gray-300 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Posts List */}

          {/* Stats Section */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Total Posts
              </h3>

              <p className="text-3xl font-bold text-primary-600">
                {posts.length}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Latest Post
              </h3>

              <p className="text-gray-600">
                {posts.length > 0
                  ? format(new Date(posts[0].created_at), "MMM dd, yyyy")
                  : "No posts yet"}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Categories Used
              </h3>

              <p className="text-3xl font-bold text-primary-600">
                {new Set(posts.map((post) => post.category_id)).size}
              </p>
            </div>
          </div>
          {posts.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link
                            to={`/blog/${post.id}`}
                            className="text-primary-600 hover:text-primary-800 font-medium"
                          >
                            {truncateTitle(post.title)}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {post.category?.name || "Uncategorized"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {post.created_at
                            ? format(
                                new Date(post.created_at.replace(" ", "T")),
                                "MMM dd, yyyy"
                              )
                            : "Invalid Date"}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex justify-end space-x-2">
                            <Link
                              to={`/edit-post/${post.id}`}
                              className="btn-secondary py-1 px-3 flex items-center text-sm"
                            >
                              <FiEdit2 className="mr-1" /> Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="btn-danger py-1 px-3 flex items-center text-sm"
                            >
                              <FiTrash2 className="mr-1" /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                You haven't written any posts yet
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first blog post to share your thoughts and ideas
                with the world.
              </p>
              <Link
                to="/create-post"
                className="btn-primary inline-flex items-center justify-center"
              >
                <FiPlusCircle className="mr-2" />
                Create Your First Post
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
