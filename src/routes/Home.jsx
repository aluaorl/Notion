import React, { useContext } from 'react'
import { UserContext } from '../components/UserContextProvider'
import { Link } from 'react-router-dom'
import Header from '../page/Header'
import Footer from '../page/Footer'

const Home = () => {
  const { user, loading } = useContext(UserContext)

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <div
      className="flex flex-col min-h-screen 
    w-full sm:w-4/5 md:w-3/5 mx-auto mt-10"
    >
      <Header email={user?.email} />
      <div className=" p-4 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-10">About me</h2>
        <div className="flex justify-center mt-10">
          <div className="flex flex-col items-center">
            {user && (
              <>
                <p className="font-semibold text-lg mb-2">
                  Email: <span className="font-normal">{user.email}</span>
                </p>
                <p className="font-semibold text-lg mb-2">
                  Date sign up:{' '}
                  <span className="font-normal">
                    {new Date(user.createdAt).toLocaleString()}
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <button className="bg-gray-300 text-black font-semibold p-2 w-40">
            <Link to="/notes">Go to Notes</Link>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
