import React, { useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from '../components/UserContextProvider'

const Header = ({ email }) => {
  const { logout } = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) =>
    location.pathname === path ? 'text-black font-bold' : 'text-gray-600'

  return (
    <header className="flex justify-between p-4">
      <h1 className="text-lg">Hello, {email}</h1>
      <nav>
        <Link to="/home" className={`mr-4 ${isActive('/home')}`}>
          Home
        </Link>
        <Link to="/notes" className={`mr-4 ${isActive('/notes')}`}>
          Notes
        </Link>
        <Link onClick={handleLogout} className="mr-4 text-gray-600">
          Logout
        </Link>
      </nav>
    </header>
  )
}

export default Header
