import React, { useState, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../components/UserContextProvider'
import { fetchUsers } from '../Api'
import { setUser, setLoading, setError } from '../redux/actions'
import Footer from '../page/Footer'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setErrorState] = useState('')
  const userContext = useContext(UserContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    const query = new URLSearchParams({ email, password }).toString()

    dispatch(setLoading(true))
    try {
      const users = await fetchUsers(query)
      const user = users[0]
      if (user) {
        userContext.onChange(user)
        dispatch(setUser(user))
        navigate('/home')
      } else {
        setErrorState('Invalid user')
      }
    } catch (err) {
      setErrorState('An error occurred, please try again.')
      console.error(err)
      dispatch(setError(err.message))
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="flex justify-center min-h-screen">
      <div className="prose w-3/4">
        <h2 className="text-2xl font-bold flex justify-center">Log in</h2>
        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col items-center"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full bg-gray-300 text-zinc-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mt-2 bg-gray-300 text-zinc-400"
            required
          />
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button
            type="submit"
            className="bg-gray-300 text-black font-bold p-2 mt-10 w-1/2"
          >
            Log in
          </button>
        </form>
        <div className="mt-2 text-center">
          <span>
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/')}
              className="text-blue-500 underline"
            >
              Sign up
            </button>
          </span>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Login
