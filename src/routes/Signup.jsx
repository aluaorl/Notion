import { z } from 'zod'
import React, { useState, useContext, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { User } from '../utils/validation'
import Footer from '../page/Footer'
import { UserContext } from '../components/UserContextProvider'
import { createUser } from '../Api'
import { setUser, setLoading, setError } from '../redux/actions'

const Signup = React.memo(() => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState(null)
  const { onChange } = useContext(UserContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleRegister = useCallback(
    async (e) => {
      e.preventDefault()
      setErrors(null)
      dispatch(setLoading(true))

      try {
        User.parse({ email, password })

        if (password !== confirmPassword) {
          throw new z.ZodError([
            {
              path: ['confirmPassword'],
              message: 'Passwords do not match. Please try again.',
            },
          ])
        }

        const id = Date.now()
        const createdAt = new Date().toISOString()
        const newUser = await createUser({ id, email, password, createdAt })
        onChange(newUser)
        dispatch(setUser(newUser))
        navigate('/home', { state: { registrationDate: createdAt, email } })
      } catch (err) {
        if (err instanceof z.ZodError) {
          setErrors(err.format())
        } else {
          setErrors({ general: [{ _errors: [err.message] }] })
          dispatch(setError(err.message))
        }
      } finally {
        dispatch(setLoading(false))
      }
    },
    [email, password, confirmPassword, onChange, navigate, dispatch]
  )

  return (
    <div className="flex justify-center min-h-screen">
      <div className="prose w-3/4">
        <h2 className="text-2xl font-bold flex justify-center">Sign Up</h2>
        <div className="w-full flex flex-col items-center">
          <div className="w-3/4 flex flex-col items-center">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full bg-gray-300 text-zinc-400 mb-2"
              required
            />
            {errors?.email && (
              <div className="text-red-500 mb-2">
                {errors.email._errors.join(', ')}
              </div>
            )}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full bg-gray-300 text-zinc-400 mb-2"
              required
            />
            {errors?.password && (
              <div className="text-red-500 mb-2">
                {errors.password._errors.join(', ')}
              </div>
            )}
            <input
              type="password"
              placeholder="Repeat password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border p-2 w-full bg-gray-300 text-zinc-400 mb-2"
              required
            />
            {errors?.confirmPassword && (
              <div className="text-red-500 mb-2">
                {errors.confirmPassword._errors.join(', ')}
              </div>
            )}
            <button
              type="button"
              onClick={handleRegister}
              className="bg-gray-300 text-black font-bold p-2 mt-4 w-1/2"
            >
              Sign Up
            </button>
            {errors?.general && (
              <div className="text-red-500 mb-2">
                {errors.general[0]._errors.join(', ')}
              </div>
            )}
            <div className="mt-2 text-center">
              <span>
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-blue-500 underline"
                >
                  Log In
                </button>
              </span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
})

export default Signup
