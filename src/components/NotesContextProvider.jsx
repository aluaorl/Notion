import React, { createContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNote, deleteNote } from '../redux/actions'

export const NotesContext = createContext()

const NotesContextProvider = ({ children, currentUserId }) => {
  const dispatch = useDispatch()
  const notes = useSelector((state) => state.notes)

  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:5001/notes')
      if (!response.ok) {
        throw new Error('Failed to fetch notes')
      }
      const data = await response.json()
      const userNotes = data.filter((note) => note.userId === currentUserId)

      userNotes.forEach((note) => dispatch(addNote(note)))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (currentUserId) {
      fetchNotes()
    }
  }, [currentUserId, dispatch])

  const handleAddNote = (newNote) => {
    dispatch(addNote(newNote))
  }

  return (
    <NotesContext.Provider
      value={{
        notes,
        handleAddNote,
        deleteNote: (id) => dispatch(deleteNote(id)),
      }}
    >
      {children}
    </NotesContext.Provider>
  )
}

export default NotesContextProvider
