"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import "./App.css"
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { FaPlus } from "react-icons/fa"

function Navbar() {
  const [user, setUser] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const userMenuRef = useRef(null)
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    const checkAndSetUser = () => {
      const storedUser = localStorage.getItem("user")
      const storedToken = localStorage.getItem("token")
      
      if (storedUser && storedToken) {
        try {
          const parsedUser = JSON.parse(storedUser)
          if (parsedUser && typeof parsedUser === "object") {
            setUser(parsedUser)
          } else {
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            setUser(null)
          }
        } catch (error) {
          console.error("Error parsing user data:", error)
          localStorage.removeItem("user")
          localStorage.removeItem("token")
          setUser(null)
        }
      } else {
        setUser(null)
      }
    }

    checkAndSetUser()
  }, [location.pathname])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    setIsUserMenuOpen(false)
    setIsMobileMenuOpen(false)
    navigate("/login")
  }

  const handleNavigation = (path) => {
    setIsUserMenuOpen(false)
    setIsMobileMenuOpen(false)
    navigate(path)
  }

  const isActivePath = (path) => {
    return location.pathname === path
  }

  return (
    <>
      <nav className="bg-gray-100 shadow-md fixed w-full top-0 z-[100]">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex items-center">
              <span 
                className="text-black text-2xl font-bold cursor-pointer" 
                onClick={() => handleNavigation("/")}
              >
                TravelEase
              </span>
            </div>

            <div className="flex-1 flex justify-center">
              <div className="hidden sm:flex space-x-12">
                <button
                  onClick={() => handleNavigation("/hotel")}
                  className={`text-black px-3 py-1 text-lg font-medium hover:bg-gray-200 transition-all duration-300 ${
                    isActivePath("/hotel") ? "bg-gray-200" : ""
                  }`}
                >
                  Hotels
                </button>
                <button
                  onClick={() => handleNavigation("/car")}
                  className={`text-black px-3 py-1 text-lg font-medium hover:bg-gray-200 transition-all duration-300 ${
                    isActivePath("/car") ? "bg-gray-200" : ""
                  }`}
                >
                  Cars
                </button>
                <button
                  onClick={() => handleNavigation("/rental")}
                  className={`text-black px-3 py-1 text-lg font-medium hover:bg-gray-200 transition-all duration-300 ${
                    isActivePath("/rental") ? "bg-gray-200" : ""
                  }`}
                >
                  Rental
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {user && (
                <Link
                  to="/property-types"
                  className="hidden sm:flex items-center space-x-2 bg-[#E61E51] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-rose-700 transition-all duration-200"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <FaPlus className="text-sm" />
                  <span>Host an experience</span>
                </Link>
              )}
              <div className="flex items-center mr-4">
                <div className="relative">
                  <button className="text-gray-700 hover:text-gray-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      1
                    </span>
                  </button>
                </div>
              </div>
              {user ? (
                <div className="hidden sm:flex items-center relative" ref={userMenuRef}>
                  <button
                    className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-full text-sm font-medium border border-gray-300 hover:bg-gray-300 focus:outline-none"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <span>{user.firstName} {user.lastName}</span>
                    <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 font-bold">
                      {user.firstName ? user.firstName.charAt(0) : "U"}
                    </span>
                  </button>
                  {isUserMenuOpen && (
                    <div
                      className="absolute right-0 top-12 w-64 bg-white rounded-lg shadow-lg z-[101] flex flex-col py-2"
                      style={{ minWidth: "220px" }}
                    >
                      <Link 
                        to="/profile"
                        className="px-6 py-3 text-left text-gray-700 font-semibold hover:bg-gray-100 transition-all duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/favorites"
                        className="px-6 py-3 text-left text-gray-700 font-semibold hover:bg-gray-100 transition-all duration-200"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Favorites
                      </Link>
                      <hr className="border-gray-200 my-1" />
                      <button 
                        className="px-6 py-3 text-left text-red-600 font-semibold hover:bg-red-50 transition-all duration-200"
                        onClick={handleLogout}
                      >
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-4">
                  <button className="bg-white text-[#E61E51] px-3 py-1 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors duration-300 border border-[#E61E51]">
                    <Link to="/login">Login</Link>
                  </button>
                  <button className="bg-[#E61E51] text-white px-3 py-1 rounded-lg text-lg font-medium hover:bg-rose-800 transition-colors duration-300">
                    <Link to="/signup">Sign up</Link>
                  </button>
                </div>
              )}
              <div className="sm:hidden flex items-center space-x-2 mr-2" ref={mobileMenuRef}>
                {!user ? (
                  <>
                    <button className="bg-white text-[#E61E51] px-3 py-1 rounded-md text-base font-medium hover:bg-gray-100 transition-colors duration-300 border border-[#E61E51]">
                      <Link to="/login">Login</Link>
                    </button>
                    <button className="bg-[#E61E51] text-white px-3 py-1 rounded-md text-base font-medium hover:bg-rose-800 transition-colors duration-300">
                      <Link to="/signup">Sign up</Link>
                    </button>
                  </>
                ) : (
                  <div className="relative flex items-center">
                    <button
                      className="flex items-center space-x-2 bg-white px-3 py-1 rounded-md text-base font-medium border border-gray-300 hover:bg-gray-100 focus:outline-none"
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                      <span>{user.firstName} {user.lastName}</span>
                      <span className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-base">
                        {user.firstName.charAt(0)}
                      </span>
                    </button>
                    {isMobileMenuOpen && (
                      <div
                        className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-lg z-[101] flex flex-col py-2"
                        style={{ minWidth: "200px", top: "100%" }}
                      >
                        <Link
                          to="/profile"
                          className="px-5 py-3 text-left text-gray-700 font-semibold hover:bg-gray-100 transition-all duration-200 rounded-t-2xl"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Profile
                        </Link>
                        <Link
                          to="/favorites"
                          className="px-5 py-3 text-left text-gray-700 font-semibold hover:bg-gray-100 transition-all duration-200"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Favorites
                        </Link>
                        <hr className="border-gray-200 my-0" />
                        <Link
                          to="/property-types"
                          className="px-5 py-3 text-left text-gray-700 font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <FaPlus className="text-sm" />
                          <span>Host an experience</span>
                        </Link>
                        <hr className="border-gray-200 my-0" />
                        <button
                          className="px-5 py-3 text-left text-red-600 font-semibold hover:bg-red-50 transition-all duration-200 rounded-b-2xl"
                          onClick={handleLogout}
                        >
                          Log out
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16"></div> {/* Spacer to prevent content from being hidden under fixed navbar */}
    </>
  )
}

export default Navbar
