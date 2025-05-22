import React from 'react'
import { Link } from 'react-router-dom'
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiYoutube } from 'react-icons/fi'

const Footer = () => {
  const year = new Date().getFullYear()
  const isLoggedIn = !!localStorage.getItem('token') // Replace with context or auth hook if available

  return (
    <footer className="bg-white border-t border-gray-200 mt-10">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-xl font-bold text-primary-500">BlogHub</span>
            </Link>
            <p className="text-gray-600 max-w-md">
              A community-driven platform for sharing knowledge, stories, and insights. Join our growing community of writers and readers.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to={isLoggedIn ? "/dashboard" : "/login"} className="text-gray-600 hover:text-primary-500 transition-colors">
                  Log In
                </Link>
              </li>
              <li>
                <Link to={isLoggedIn ? "/dashboard" : "/register"} className="text-gray-600 hover:text-primary-500 transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/create-post" className="text-gray-600 hover:text-primary-500 transition-colors">Write a Post</Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Connect To Author</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://github.com/shreyash7218" className="text-gray-600 hover:text-primary-500 transition-colors">
                <FiGithub size={20} />
              </a>
              <a href="https://x.com/ShreyashG85599" className="text-gray-600 hover:text-primary-500 transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="https://www.linkedin.com/in/shreyash-gund-4ab800193/" className="text-gray-600 hover:text-primary-500 transition-colors">
                <FiLinkedin size={20} />
              </a>
              
              <a href="https://www.youtube.com/@SG-ih4xk" className="text-gray-600 hover:text-primary-500 transition-colors">
                <FiYoutube size={20} />
              </a>
              <a href="mailto:shreyashgund2001@gmail.com" className="text-gray-600 hover:text-primary-500 transition-colors">
                <FiMail size={20} />
              </a>
            </div>
            <p className="text-gray-600">
              Contact us: <a href="mailto:shreyashgund2001@gmail.com" className="text-primary-500">shreyashgund2001@gmail.com</a>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            &copy; {year} BlogHub. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="#" className="text-gray-600 hover:text-primary-500 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-600 hover:text-primary-500 transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
