import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setError, setNotes, setFetched } from '../redux/actions'
import { fetchNotes } from '../Api'

export const useNotes = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const notes = useSelector((state) => state.notes)
  const loading = useSelector((state) => state.loading)
  const fetched = useSelector((state) => state.fetched)
  const error = useSelector((state) => state.error)

  const loadNotes = async () => {
    dispatch(setLoading(true))

    try {
      const data = await fetchNotes(user.id)
      dispatch(setNotes(data))
    } catch (err) {
      dispatch(setError(err.message))
    } finally {
      dispatch(setLoading(false))
      dispatch(setFetched(true))
    }
  }

  useEffect(() => {
    if (!user || fetched) {
      return
    }

    loadNotes()
  }, [])

  return { notes, loading, error }
}
