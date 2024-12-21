import React, { useState, useEffect, useCallback } from 'react'

const NoteForm = React.memo(({ note, onSubmit }) => {
  const [title, setTitle] = useState(note.title || '')
  const [body, setBody] = useState(note.body || '')
  const [titleError, setTitleError] = useState('')

  useEffect(() => {
    setTitle(note.title || '')
    setBody(note.body || '')
    setTitleError('')
  }, [note])

  const handleTitleChange = (e) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    if (newTitle.trim()) {
      setTitleError('')
    }
  }

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (title.trim() === '') {
        setTitleError(
          'The note title cannot be empty or consist only of spaces.'
        )
        return
      }
      setTitleError('')
      onSubmit({ title, body })
    },
    [title, body, onSubmit]
  )

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
        className="border p-2 w-full bg-gray-300"
        required
      />
      {titleError && <p className="text-red-500">{titleError}</p>}
      <textarea
        placeholder="Note text"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="border p-2 w-full mt-2 bg-gray-300"
      />
      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="bg-gray-300 text-black font-bold p-2 w-1/2"
        >
          Save
        </button>
      </div>
    </form>
  )
})

export default NoteForm
