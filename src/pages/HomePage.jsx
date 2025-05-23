import React from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import BlogCard from '../components/blog/BlogCard'
import CategoryFilter from '../components/blog/CategoryFilter'
import SearchBar from '../components/blog/SearchBar'
import NewPosts from '../components/blog/NewPosts'
import { getAllPosts, getPostsByCategory, searchPosts } from '../services/postService'
import { FiChevronDown } from 'react-icons/fi'

const HomePage = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAllCategories, setShowAllCategories] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('category')
  const searchParam = searchParams.get('search')
  const sortParam = searchParams.get('sort')

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      setError('')

      try {
        let data

        if (searchParam) {
          data = await searchPosts(searchParam)
        } else if (categoryId) {
          data = await getPostsByCategory(categoryId)
        } else {
          data = await getAllPosts()
        }

        let sortedPosts = data.posts || data
        if (sortParam) {
          sortedPosts = sortPosts(sortedPosts, sortParam)
        }

        setPosts(sortedPosts)
      } catch (error) {
        console.error('Failed to fetch posts', error)
        setError('Failed to load posts. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [categoryId, searchParam, sortParam])

  const sortPosts = (posts, sortBy) => {
    switch (sortBy) {
      case 'oldest':
        return [...posts].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      case 'title':
        return [...posts].sort((a, b) => a.title.localeCompare(b.title))
      case 'popular':
        return posts
      default:
        return [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }
  }

  const handleSearch = (query, filters) => {
    const params = new URLSearchParams()
    if (query) params.set('search', query)
    if (filters.category !== 'all') params.set('category', filters.category)
    if (filters.sortBy !== 'newest') params.set('sort', filters.sortBy)
    setSearchParams(params)
  }

  return (
    <div className="pt-20">
      <section className="bg-gray-50 py-12 mb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Discover, Read, and Share Ideas
            </h1>
            <p className="text-xl text-gray-600">
              Explore diverse stories, articles, and insights from writers around the world.
            </p>
          </div>
          <SearchBar 
            initialQuery={searchParam || ''} 
            onSearch={handleSearch}
          />
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <div className="mb-8">
              <CategoryFilter 
              />
              
            </div>

            {searchParam && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Search results for: <span className="text-primary-500">"{searchParam}"</span>
                </h2>
              </div>
            )}

            {error && (
              <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
                {error}
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-300"></div>
                    <div className="p-5 space-y-4">
                      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded"></div>
                      </div>
                      <div className="flex justify-between">
                        <div className="h-8 bg-gray-300 rounded-full w-24"></div>
                        <div className="h-4 bg-gray-300 rounded w-20"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {posts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {posts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">No posts found</h3>
                    <p className="text-gray-500">
                      {searchParam
                        ? `No posts match your search for "${searchParam}"`
                        : categoryId
                        ? 'No posts in this category yet'
                        : 'There are no posts yet. Be the first to create one!'}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="lg:w-1/4">
            <NewPosts />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
