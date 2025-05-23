import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

const BlogCard = ({ post }) => {
  const {
    id,
    title,
    content,
    featured_image,
    created_at,
    user,
    category
  } = post

  // Truncate content for preview
  const truncateContent = (text, maxLength = 150) => {
    if (!text) return ''
    const strippedContent = text.replace(/<[^>]*>/g, '')
    if (strippedContent.length <= maxLength) return strippedContent
    return strippedContent.substring(0, maxLength).trim() + '...'
  }

  //format date
  let formattedDate = 'Unknown date'
  if (created_at) {
    const date = new Date(created_at)
    if (!isNaN(date)) {
      formattedDate = format(date, 'MMM dd, yyyy')
    }
  }

  return (
    <article className="card group">
      <Link to={`/blog/${id}`} className="block overflow-hidden">
        <img
          src={
            featured_image ||
            'https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          }
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="p-5">
        {category && (
          <Link
            to={`/?category=${category.id}`}
            className="inline-block px-3 py-1 mb-3 text-xs font-medium text-primary-700 bg-primary-100 rounded-full"
          >
            {category.name}
          </Link>
        )}

        <Link to={`/blog/${id}`}>
          <h3 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 group-hover:text-primary-500 transition-colors">
            {title}
          </h3>
        </Link>

        <p className="mb-3 text-gray-600">{truncateContent(content)}</p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-medium">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span className="ml-2 text-sm text-gray-700">
              {user?.username || 'Anonymous'}
            </span>
          </div>

          <time className="text-sm text-gray-500">{formattedDate}</time>
        </div>

        <Link
          to={`/blog/${id}`}
          className="inline-flex items-center mt-4 text-primary-600 hover:text-primary-800 transition-colors"
        >
          Read more
          <svg
            className="w-4 h-4 ml-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </article>
  )
}

export default BlogCard