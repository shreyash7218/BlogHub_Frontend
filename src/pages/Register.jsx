import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { FiMail, FiLock, FiUser, FiAlertCircle } from 'react-icons/fi'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [validationErrors, setValidationErrors] = useState({})

  const { register } = useAuth()
  const navigate = useNavigate()

  const validatePassword = (password) => {
    const errors = {}
    if (password.length < 8) errors.length = true
    if (!/[A-Z]/.test(password)) errors.uppercase = true
    if (!/[a-z]/.test(password)) errors.lowercase = true
    if (!/[0-9]/.test(password)) errors.number = true
    if (!/[!@#$%^&*]/.test(password)) errors.symbol = true
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setValidationErrors({})

    if (!username.trim() || !email.trim() || !password || !confirmPassword) {
      setError('All fields are required')
      return
    }

    const passwordErrors = validatePassword(password)
    if (Object.keys(passwordErrors).length > 0) {
      setValidationErrors(passwordErrors)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const result = await register(username, email, password)
      if (result.success) {
        navigate('/')
      } else {
        setError(result.message || 'Registration failed. Please try again.')
      }
    } catch (error) {
      setError('An error occurred during registration. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const allValid = password && Object.keys(validatePassword(password)).length === 0

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Create an account</h1>
          <p className="mt-2 text-gray-600">
            Join our community of writers and readers
          </p>
        </div>

        {error && (
          <div className="bg-red-100 p-4 rounded-md flex items-start">
            <FiAlertCircle className="text-red-600 mt-0.5 mr-3 flex-shrink-0" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input pl-10"
                placeholder="Choose a username"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input pl-10"
                placeholder="Your email address"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  const value = e.target.value
                  setPassword(value)
                  setValidationErrors(validatePassword(value))
                }}
                className={`form-input pl-10 ${Object.keys(validationErrors).length > 0 ? 'border-red-300' : ''}`}
                placeholder="Create a password"
                required
              />
            </div>

            {!allValid && password && (
              <ul className="mt-2 text-xs list-disc list-inside">
                <li className={`${validationErrors.length ? 'text-red-500' : 'text-green-600'}`}>
                  At least 8 characters long
                </li>
                <li className={`${validationErrors.uppercase ? 'text-red-500' : 'text-green-600'}`}>
                  Include uppercase letter
                </li>
                <li className={`${validationErrors.lowercase ? 'text-red-500' : 'text-green-600'}`}>
                  Include lowercase letter
                </li>
                <li className={`${validationErrors.number ? 'text-red-500' : 'text-green-600'}`}>
                  Include at least one number
                </li>
                <li className={`${validationErrors.symbol ? 'text-red-500' : 'text-green-600'}`}>
                  Include at least one symbol (!@#$%^&*)
                </li>
              </ul>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input pl-10"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 flex justify-center"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Sign up'
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-800 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
