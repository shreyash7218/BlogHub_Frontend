import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { FiMenu, FiX, FiSearch, FiUser, FiLogOut, FiEdit } from 'react-icons/fi'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <nav 
      className={`fixed w-full top-0 z-10 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-primary-500">BlogHub</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="py-1 px-3 pr-8 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                <FiSearch size={18} />
              </button>
            </form>
            
            <Link to="/" className="text-gray-700 hover:text-primary-500 transition-colors">Home</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/create-post" className="text-gray-700 hover:text-primary-500 transition-colors flex items-center">
                  <FiEdit className="mr-1" /> Write
                </Link>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary-500 transition-colors flex items-center">
                  <FiUser className="mr-1" /> Dashboard
                </Link>
                <button onClick={logout} className="text-gray-700 hover:text-primary-500 transition-colors flex items-center">
                  <FiLogOut className="mr-1" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-500 transition-colors">Log In</Link>
                <Link to="/register" className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4 animate-slide-up">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <FiSearch size={18} />
              </button>
            </form>
            
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-primary-500 transition-colors py-2">Home</Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/create-post" className="text-gray-700 hover:text-primary-500 transition-colors py-2 flex items-center">
                    <FiEdit className="mr-2" /> Write
                  </Link>
                  <Link to="/dashboard" className="text-gray-700 hover:text-primary-500 transition-colors py-2 flex items-center">
                    <FiUser className="mr-2" /> Dashboard
                  </Link>
                  <button 
                    onClick={logout} 
                    className="text-gray-700 hover:text-primary-500 transition-colors py-2 flex items-center"
                  >
                    <FiLogOut className="mr-2" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-primary-500 transition-colors py-2">Log In</Link>
                  <Link to="/register" className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors text-center">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar