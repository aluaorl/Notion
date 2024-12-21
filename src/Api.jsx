const API_URL = 'http://localhost:5001'

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'An error occurred')
  }
  return response.json()
}

export const fetchUsers = async (query = '') => {
  const response = await fetch(`${API_URL}/users?${query}`)
  return handleResponse(response)
}

export const fetchNotes = async (userId) => {
  const response = await fetch(`${API_URL}/notes`)
  const data = await handleResponse(response)
  return data.filter((note) => note.userId == userId)
}

export const fetchNoteById = async (id) => {
  const response = await fetch(`${API_URL}/notes/${id}`)
  return handleResponse(response)
}

export const updateNote = async (id, updatedNote) => {
  const response = await fetch(`${API_URL}/notes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedNote),
  })
  return handleResponse(response)
}

export const createUser = async (userData) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
  return handleResponse(response)
}

export const createNote = async (noteData) => {
  const response = await fetch(`${API_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(noteData),
  })
  return handleResponse(response)
}

export const handleDelete = async (id) => {
  const response = await fetch(`${API_URL}/notes/${id}`, { method: 'DELETE' })
  return handleResponse(response)
}
