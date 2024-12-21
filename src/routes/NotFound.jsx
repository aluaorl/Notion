import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../components/UserContextProvider'
import Footer from '../page/Footer'

const NotFound = () => {
  const { user } = useContext(UserContext)

  return (
    <div className="mt-5 max-w-md mx-auto text-center">
      <h2 className="text-3xl font-bold">404 - Page not found</h2>
      {user ? (
        <Link to="/home" className="text-2xl p-2 mt-4 inline-block">
          Go <span className="text-blue-500 underline">Home</span>
        </Link>
      ) : (
        <Link to="/login" className="text-2xl p-2 mt-4 inline-block">
          Go <span className=" text-blue-500 underline">Log in</span>
        </Link>
      )}
      <Footer />
    </div>
  )
}

export default NotFound
