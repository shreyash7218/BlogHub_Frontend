import React from 'react'

import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getAllCategories } from '../../services/postService'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

const CategoryFilter = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const [searchParams] = useSearchParams()
  const currentCategoryId = searchParams.get('category')

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories()
        setCategories(data)
      } catch (error) {
        console.error('Failed to fetch categories', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-10 animate-pulse">
        <div className="h-full bg-gray-200 rounded w-full"></div>
      </div>
    )
  }

  if (categories.length === 0) {
    return null
  }

  const visibleCategories = expanded ? categories : categories.slice(0, 7)

  return (
    <div className="mb-8 overflow-x-auto py-2">
      <div className="flex flex-wrap gap-3">
        <Link
          to="/"
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
            !currentCategoryId
              ? 'bg-primary-500 text-white hover:bg-primary-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          } transition-colors`}
        >
          All Posts
        </Link>

        {visibleCategories.map((category) => (
          <Link
            key={category.id}
            to={`/?category=${category.id}`}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              currentCategoryId === category.id.toString()
                ? 'bg-primary-500 text-white hover:bg-primary-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors`}
          >
            {category.name}
          </Link>
        ))}

        {categories.length > 10 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-4 py-2 rounded-full text-sm font-medium bg-gray-300 text-gray-800 hover:bg-gray-400 transition-colors flex items-center gap-1"
          >
            {expanded ? (
              <>
                Show Less <FiChevronUp />
              </>
            ) : (
              <>
                More <FiChevronDown />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default CategoryFilter
