import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../page/Header'
import Footer from '../page/Footer'
import NoteForm from './NoteForm'
import { createNote } from '../Api'
import { setNotes } from '../redux/actions'

const CreateNote = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const notes = useSelector((state) => state.notes)
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCreateNote = async (newNote) => {
    setError('')
    setLoading(true)

    const noteData = {
      ...newNote,
      userId: user?.id,
      createdAt: new Date().toISOString(),
    }

    try {
      const createdNote = await createNote(noteData)
      dispatch(setNotes([...notes, createdNote]))
      navigate(`/notes/${createdNote.id}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

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
            Create new note
          </h2>
        </div>
        <NoteForm note={{}} onSubmit={handleCreateNote} />
        <div>
          {loading && <p className="text-gray-500">Creating note...</p>}
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <Footer />
    </div>
  )
}

export default CreateNote
