import api from './api'

// Get all posts
export const getAllPosts = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/posts?page=${page}&limit=${limit}`)
    return response.data
  } catch (error) {
    throw error
  }
}

// Get posts by category
export const getPostsByCategory = async (categoryId, page = 1, limit = 10) => {
  try {
    const response = await api.get(`/posts/category/${categoryId}?page=${page}&limit=${limit}`)
    return response.data
  } catch (error) {
    throw error
  }
}

// Get a single post by ID
export const getPostById = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

// Get posts by user
export const getUserPosts = async () => {
  try {
    const response = await api.get('/posts/user')
    return response.data
  } catch (error) {
    throw error
  }
}

// Create a new post
export const createPost = async (postData) => {
  try {
    const response = await api.post('/posts', postData)
    return response.data
  } catch (error) {
    throw error
  }
}

// Update a post
export const updatePost = async (id, postData) => {
  try {
    const response = await api.put(`/posts/${id}`, postData)
    return response.data
  } catch (error) {
    throw error
  }
}

// Delete a post
export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/posts/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

// Search posts
export const searchPosts = async (query) => {
  try {
    const response = await api.get(`/posts/search?q=${encodeURIComponent(query)}`)
    return response.data
  } catch (error) {
    throw error
  }
}

// Get all categories
export const getAllCategories = async () => {
  try {
    const response = await api.get('/categories')
    return response.data
  } catch (error) {
    throw error
  }
}