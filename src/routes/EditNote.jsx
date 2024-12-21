import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setNotes } from '../redux/actions'
import NoteForm from './NoteForm'
import { fetchNoteById, updateNote } from '../Api'
import Header from '../page/Header'
import Footer from '../page/Footer'
import { UserContext } from '../components/UserContextProvider'

const EditNote = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const notes = useSelector((state) => state.notes)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentNote, setCurrentNote] = useState(null)
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  useEffect(() => {
    const loadNote = async () => {
      try {
        const data = await fetchNoteById(id)
        setCurrentNote(data)
      } catch (err) {
        setError('Error fetching note: ' + err.message)
      } finally {
        setLoading(false)
      }
    }
    loadNote()
  }, [id])

  const handleEditNote = async (updatedNote) => {
    setError('')

    if (!updatedNote.title.trim()) {
      setError('The note title cannot be empty.')
      return
    }

    try {
      const noteData = await updateNote(id, {
        ...updatedNote,
        userId: currentNote.userId,
        createdAt: currentNote.createdAt,
      })

      dispatch(
        setNotes(notes.map((n) => (n.id === noteData.id ? noteData : n)))
      )

      navigate(`/notes/${noteData.id}`)
    } catch (err) {
      setError('Error updating note: ' + err.message)
    }
  }
  if (loading) return <p>Loading...</p>

  return (
    <div className="flex flex-col min-h-screen w-full sm:w-4/5 md:w-3/5 mx-auto mt-2">
      <Header email={user?.email} />
      <div className="max-w-md mx-auto p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/notes')}
            className="text-black bg-gray-300 w-12 size-8"
          >
            Back
          </button>
          <h2 className="text-2xl font-bold flex-grow text-center">
            Edit Note
          </h2>
        </div>
        <NoteForm note={currentNote} onSubmit={handleEditNote} error={error} />
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <Footer />
    </div>
  )
}

export default EditNote
