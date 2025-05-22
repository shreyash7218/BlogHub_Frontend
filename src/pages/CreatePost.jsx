import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiAlertCircle } from 'react-icons/fi'
import BlogEditor from '../components/blog/BlogEditor'
import { createPost } from '../services/postService'

const CreatePost = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate()
  
  const handleSubmit = async (postData) => {
    try {
      const newPost = await createPost(postData)
      navigate(`/blog/${newPost.id}`)
    } catch (error) {
      console.error('Failed to create post', error)
      setError(error.response?.data?.message || 'Failed to create post. Please try again.')
      throw error
    }
  }
  
  return (
    <div className="pt-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Post</h1>
        <p className="text-gray-600">
          Share your thoughts, ideas, and stories with the world
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
          onSubmit={handleSubmit}
          submitButtonText="Publish Post"
        />
      </div>
    </div>
  )
}

export default CreatePost