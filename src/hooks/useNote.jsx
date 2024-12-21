import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setError, setNotes } from '../redux/actions'
import { fetchNoteById } from '../Api'
export const useNote = (id) => {
  const dispatch = useDispatch()

  const note = useSelector((state) => state.notes.find((n) => n.id === id))
  const loading = useSelector((state) => state.loading)
  const error = useSelector((state) => state.error)

  useEffect(() => {
    const loadNote = async () => {
      if (!note) {
        dispatch(setLoading(true))
        try {
          const data = await fetchNoteById(id)
          dispatch(
            setNotes((prevNotes) => {
              if (!Array.isArray(prevNotes)) {
                return [data]
              }
              return prevNotes.some((n) => n.id === data.id)
                ? prevNotes
                : [...prevNotes, data]
            })
          )
        } catch (err) {
          dispatch(setError(err.message))
        } finally {
          dispatch(setLoading(false))
        }
      }
    }

    loadNote()
  }, [id, dispatch, note])

  return { note, loading, error }
}
