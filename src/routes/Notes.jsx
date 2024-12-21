import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, connect } from 'react-redux'
import Header from '../page/Header'
import Footer from '../page/Footer'
import { UserContext } from '../components/UserContextProvider'
import { deleteNote } from '../redux/actions'
import { handleDelete as apiHandleDelete } from '../Api'

const Notes = ({ notes, loading, error }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  const handleDelete = async (id) => {
    try {
      await apiHandleDelete(id)
      dispatch(deleteNote(id))
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error: {error}</div>

  return (
    <div className="flex flex-col min-h-screen w-full sm:w-4/5 md:w-3/5 mx-auto mt-2">
      <Header email={user?.email} />
      <div className="p-4 flex flex-col items-center">
        <h2 className="text-2xl font-bold">Notes</h2>
        <button className="bg-gray-300 text-black font-bold p-2 mt-3 mb-5 w-60">
          <Link to="/create">Add new note</Link>
        </button>
        {notes.length === 0 ? (
          <p className="text-green-700 font-bold">
            You don't have notes yet, take one right now!
          </p>
        ) : (
          <ul className="w-full">
            {notes
              .sort((n1, n2) => new Date(n2.createdAt) - new Date(n1.createdAt))
              .map((note) => (
                <li
                  key={note.id}
                  className="bg-gray-300 border p-2 mt-2 flex flex-col 
                relative min-w-[20em] sm:min-w-[10em] md:min-w-[10em] lg:min-w-[5em]"
                  onClick={() => navigate(`/notes/${note.id}`)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-grow pr-4">
                      <h3
                        className="font-semibold text-lg overflow-hidden
                     text-ellipsis whitespace-nowrap max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
                      >
                        {note.title}
                      </h3>
                      <p className="text-sm">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/edit/${note.id}`)
                        }}
                        className="mr-2"
                      >
                        ✍️
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(note.id)
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => ({
  notes: state.notes,
  loading: state.loading,
  error: state.error,
})

export default connect(mapStateToProps)(Notes)
