import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './routes/Signup'
import Login from './routes/Login'
import Home from './routes/Home'
import Notes from './routes/Notes'
import CreateNote from './routes/CreateNote'
import EditNote from './routes/EditNote'
import ViewNote from './routes/ViewNote'
import NotFound from './routes/NotFound'
import UserContextProvider, {
  UserContext,
} from './components/UserContextProvider'
import NotesContextProvider from './components/NotesContextProvider'
import RequireAuth from './components/RequireAuth'

const App = () => {
  return (
    <UserContextProvider>
      <UserContextConsumer />
    </UserContextProvider>
  )
}

const UserContextConsumer = () => {
  const { user } = useContext(UserContext)

  return (
    <NotesContextProvider currentUserId={user?.id}>
      {' '}
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen  p-4">
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="/notes"
              element={
                <RequireAuth>
                  <Notes />
                </RequireAuth>
              }
            />
            <Route
              path="/create"
              element={
                <RequireAuth>
                  <CreateNote />
                </RequireAuth>
              }
            />
            <Route
              path="/notes/:id"
              element={
                <RequireAuth>
                  <ViewNote />
                </RequireAuth>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <RequireAuth>
                  <EditNote />
                </RequireAuth>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </NotesContextProvider>
  )
}

export default App
