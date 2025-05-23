import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { FiEdit2, FiTrash2, FiClock, FiUser, FiFolder } from 'react-icons/fi'
import { getPostById, deletePost } from '../services/postService'
import { useAuth } from '../contexts/AuthContext'

const BlogPost = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id)
        setPost(data)
      } catch (error) {
        console.error('Failed to fetch post', error)
        setError('Failed to load the blog post. It may have been removed or you do not have permission to view it.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchPost()
  }, [id])
  
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return
    }
    
    setIsDeleting(true)
    
    try {
      await deletePost(id)
      navigate('/dashboard', { state: { message: 'Post deleted successfully' } })
    } catch (error) {
      console.error('Failed to delete post', error)
      setError('Failed to delete the post. Please try again.')
      setIsDeleting(false)
    }
  }
  
  //loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
          <div className="h-64 bg-gray-300 rounded mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }
  
  //error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto bg-red-100 text-red-700 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Error</h2>
          <p>{error}</p>
          <Link to="/" className="mt-4 inline-block text-primary-600 hover:text-primary-800">
            Return to home page
          </Link>
        </div>
      </div>
    )
  }
  
  //post content
  const isAuthor = user && post?.user_id === user.id
  const formattedDate = format(new Date(post.created_at), 'MMMM dd, yyyy')
  
  return (
    <div className="container mx-auto px-4 py-20">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-gray-600 mb-6 gap-4">
            <div className="flex items-center">
              <FiUser className="mr-2" />
              <span>{post.user?.username || 'Anonymous'}</span>
            </div>
            
            <div className="flex items-center">
              <FiClock className="mr-2" />
              <time dateTime={post.created_at}>{formattedDate}</time>
            </div>
            
            {post.category && (
              <div className="flex items-center">
                <FiFolder className="mr-2" />
                <Link 
                  to={`/?category=${post.category.id}`}
                  className="text-primary-600 hover:text-primary-800"
                >
                  {post.category.name}
                </Link>
              </div>
            )}
          </div>
          
          {isAuthor && (
            <div className="flex space-x-4 mb-8">
              <Link
                to={`/edit-post/${post.id}`}
                className="flex items-center text-sm text-gray-700 hover:text-primary-600 transition-colors"
              >
                <FiEdit2 className="mr-1" /> Edit
              </Link>
              
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                <FiTrash2 className="mr-1" /> {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          )}
          
          {post.featured_image && (
            <div className="mb-8">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}
        </header>
        
        <div 
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-primary-600 prose-a:hover:text-primary-800"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>
    </div>
  )
}

export default BlogPost