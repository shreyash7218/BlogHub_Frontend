import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiAlertCircle } from 'react-icons/fi'
import BlogEditor from '../components/blog/BlogEditor'
import { getPostById, updatePost } from '../services/postService'

const EditPost = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id)
        setPost(data)
      } catch (error) {
        console.error('Failed to fetch post', error)
        setError('Failed to load the post. It may have been removed or you do not have permission to edit it.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchPost()
  }, [id])
  
  const handleSubmit = async (postData) => {
    try {
      await updatePost(id, postData)
      navigate(`/blog/${id}`)
    } catch (error) {
      console.error('Failed to update post', error)
      setError(error.response?.data?.message || 'Failed to update post. Please try again.')
      throw error
    }
  }
  
  if (loading) {
    return (
      <div className="pt-20">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
          <div className="space-y-6">
            <div className="h-10 bg-gray-300 rounded w-3/4"></div>
            <div className="h-10 bg-gray-300 rounded w-1/2"></div>
            <div className="h-32 bg-gray-300 rounded"></div>
            <div className="h-10 bg-gray-300 rounded w-32 ml-auto"></div>
          </div>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="pt-20">
        <div className="bg-red-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error</h2>
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="mt-4 btn-primary"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }
  
  if (!post) {
    return null
  }
  
  return (
    <div className="pt-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Post</h1>
        <p className="text-gray-600">
          Update your post's content and details
        </p>
      </div>
      
      {error && (
        <div className="bg-red-100 p-4 rounded-md flex items-center mb-6">
          <FiAlertCircle className="text-red-600 mr-3 flex-shrink-0" />
          <span className="text-red-700">{error}</span>
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <BlogEditor 
          initialData={{
            title: post.title,
            content: post.content,
            category_id: post.category_id,
            featured_image: post.featured_image
          }}
          onSubmit={handleSubmit}
          submitButtonText="Update Post"
        />
      </div>
    </div>
  )
}

export default EditPost