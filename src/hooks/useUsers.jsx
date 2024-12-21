import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setError } from '../redux/actions'
import { fetchUsers } from '../Api'

export const useUsers = (query) => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const loading = useSelector((state) => state.loading)
  const error = useSelector((state) => state.error)

  useEffect(() => {
    const loadUsers = async () => {
      dispatch(setLoading(true))
      try {
        const data = await fetchUsers(query)
        dispatch(setUsers(data))
      } catch (err) {
        dispatch(setError(err.message))
      } finally {
        dispatch(setLoading(false))
      }
    }
    loadUsers()
  }, [query, dispatch])

  return { users, loading, error }
}
