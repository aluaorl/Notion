import React, { createContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setNotes, setLoading, setError } from '../redux/actions'

const UserContext = createContext()

const UserContextProvider = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const loading = useSelector((state) => state.loading)
  const error = useSelector((state) => state.error)

  useEffect(() => {
    const id = localStorage.getItem('userId')
    if (id) {
      dispatch(setLoading(true))
      fetch(`http://localhost:5001/users?id=${id}`)
        .then((response) => {
          if (!response.ok) throw new Error('Network response was not ok')
          return response.json()
        })
        .then((users) => {
          if (users.length > 0) {
            const loggedInUser = users[0]
            dispatch(setUser(loggedInUser))
            localStorage.setItem('user', JSON.stringify(loggedInUser))
          } else {
            logout()
          }
        })
        .catch((error) => {
          console.error('Error fetching user:', error)
          dispatch(setError('Failed to fetch user data'))
        })
        .finally(() => dispatch(setLoading(false)))
    } else {
      dispatch(setLoading(false))
    }
  }, [dispatch])

  const onChange = (newUser) => {
    dispatch(setUser(newUser))
    localStorage.setItem('user', JSON.stringify(newUser))
    localStorage.setItem('userId', newUser.id)
  }

  const logout = () => {
    dispatch(setUser(null))
    dispatch(setNotes([]))
    localStorage.removeItem('user')
    localStorage.removeItem('userId')
  }

  return (
    <UserContext.Provider value={{ user, loading, onChange, logout, error }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext }
export default UserContextProvider
