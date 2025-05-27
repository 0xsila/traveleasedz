import React, { useEffect, useState } from "react"
import Navbar from "./navbar"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const sidebarItems = [
  {
    icon: (
      <span role="img" aria-label="info" className="text-2xl">📝</span>
    ),
    label: "Personal info & security",
    id: "personal"
  },
  {
    icon: (
      <span role="img" aria-label="payment" className="text-2xl">💳</span>
    ),
    label: "Payment",
    id: "payment"
  }
]

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ 
    email: '', 
    firstName: '', 
    lastName: '' 
  })
  const [activeSection, setActiveSection] = useState('personal')
  const [editingField, setEditingField] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (e) {
        setUser({ email: '', firstName: '', lastName: '' })
      }
    }
  }, [])

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId)
  }

  const handleEditClick = (field) => {
    setEditingField(field)
    setEditValue(user[field] || '')
    setError('')
    setSuccess('')
  }

  const handleCancelEdit = () => {
    setEditingField(null)
    setEditValue('')
    setError('')
    setSuccess('')
  }

  const handleSaveEdit = async () => {
    try {
      setError('')
      setSuccess('')

      // Validate the input
      if (!editValue.trim()) {
        setError('This field cannot be empty')
        return
      }

      if (editingField === 'email' && !editValue.includes('@')) {
        setError('Please enter a valid email address')
        return
      }

      // Get the token from localStorage
      const token = localStorage.getItem('token')
      if (!token) {
        setError('Authentication required')
        return
      }

      // Prepare the update data
      const updateData = {
        [editingField]: editValue
      }

      // Make the API call
      const response = await axios.put(
        'http://localhost:5000/api/users/profile',
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      // Update local state
      setUser(prev => ({
        ...prev,
        [editingField]: editValue
      }))

      // Update localStorage
      const updatedUser = { ...user, [editingField]: editValue }
      localStorage.setItem('user', JSON.stringify(updatedUser))

      setSuccess('Profile updated successfully')
      setEditingField(null)
      setEditValue('')

    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile')
    }
  }

  const handlePasswordEdit = () => {
    navigate('/edit-password');
  }

  const renderEditableField = (field, label) => {
    return (
      <div className="mb-6 flex justify-between items-center border-b pb-4">
        <div className="flex-1">
          <div className="text-lg font-semibold">{label}</div>
          <div className="text-gray-700">
            {user[field] || 'Not set'}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-0">
      <Navbar />
      <div className="max-w-7xl mx-auto pt-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="bg-[#E9E9E9] rounded-2xl p-8 flex flex-col gap-4 min-w-[300px]">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                className={`flex items-center gap-4 w-full p-4 rounded-xl transition-all duration-200 ${
                  activeSection === item.id 
                    ? 'bg-[#E61E51] text-white shadow-md' 
                    : 'hover:bg-gray-200'
                }`}
              >
                {item.icon}
                <span className="text-xl font-bold">{item.label}</span>
              </button>
            ))}
          </div>
          {/* Main Content */}
          <div className="flex-1 bg-[#E9E9E9] rounded-2xl p-8 relative">
            <div className="absolute -top-8 left-0 bg-[#E9E9E9] rounded-t-2xl px-8 py-2 font-bold text-lg">Profile</div>
            {/* Personal Info & Security Section */}
            {activeSection === 'personal' && (
              <div className="bg-[#E9E9E9] rounded-xl p-6 mt-8">
                <h2 className="text-2xl font-bold mb-6">Personal info</h2>
                {renderEditableField('firstName', 'First Name')}
                {renderEditableField('lastName', 'Last Name')}
                {renderEditableField('email', 'Email address')}
              </div>
            )}
            {/* Host an Experience Section */}
            {activeSection === 'host' && (
              <div className="bg-[#E9E9E9] rounded-xl p-6 mt-8">
                <h2 className="text-2xl font-bold mb-6">Host an Experience</h2>
                <p className="text-gray-700">Coming soon...</p>
              </div>
            )}
            {/* Payment Section */}
            {activeSection === 'payment' && (
              <div className="bg-[#E9E9E9] rounded-xl p-6 mt-8">
                <h2 className="text-2xl font-bold mb-6">Payment Methods</h2>
                <p className="text-gray-700">Coming soon...</p>
              </div>
            )}
            {/* Notification Section */}
            {activeSection === 'notification' && (
              <div className="bg-[#E9E9E9] rounded-xl p-6 mt-8">
                <h2 className="text-2xl font-bold mb-6">Notification Settings</h2>
                <p className="text-gray-700">Coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile 