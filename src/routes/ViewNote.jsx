import React, { useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setNotes } from '../redux/actions'
import { UserContext } from '../components/UserContextProvider'
import Header from '../page/Header'
import Footer from '../page/Footer'
import { fetchNoteById } from '../Api'

const ViewNote = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const notes = useSelector((state) => state.notes)
  const note = notes.find((n) => n.id === id)
  const loading = useSelector((state) => state.loading)
  const error = useSelector((state) => state.error)
  const { user } = useContext(UserContext)

  const handleDelete = async () => {
    await fetch(`http://localhost:5001/notes/${id}`, { method: 'DELETE' })
    dispatch(
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id))
    )
    navigate('/notes')
  }

  useEffect(() => {
    if (!note) {
      const loadNote = async () => {
        try {
          const fetchedNote = await fetchNoteById(id)
          dispatch(setNotes((prevNotes) => [...prevNotes, fetchedNote]))
        } catch (err) {
          console.error('Error fetching note:', err)
        }
      }
      loadNote()
    }
  }, [id, note, dispatch])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!note) return <div>Note not found</div>

  return (
    <div className="flex flex-col min-h-screen w-full sm:w-4/5 md:w-3/5 mx-auto mt-2">
      <Header email={user?.email} />
      <div className="w-3/4 mx-auto p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/notes')}
            className="text-black bg-gray-300 px-2 py-1"
          >
            Back
          </button>
          <div className="flex-grow mx-4 max-h-10 overflow-hidden">
            <h2
              className="text-2xl h-20 font-bold
            whitespace-nowrap overflow-x-auto scrollbar-hidden"
            >
              {note.title}
            </h2>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => navigate(`/edit/${id}`)} className="ml-2">
              ✍️
            </button>
            <button onClick={handleDelete} className="ml-2">
              🗑️
            </button>
          </div>
        </div>
        <pre
          className="mt-4 bg-gray-300 p-2 border max-h-60
        overflow-y-auto overflow-x-hidden whitespace-pre-wrap"
        >
          {note.body}
        </pre>
      </div>
      <Footer />
    </div>
  )
}

export default ViewNote
