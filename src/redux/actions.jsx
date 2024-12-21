export const ADD_NOTE = 'ADD_NOTE'
export const SET_NOTES = 'SET_NOTES'
export const SET_USER = 'SET_USER'
export const DELETE_NOTE = 'DELETE_NOTE'
export const SET_LOADING = 'SET_LOADING'
export const SET_FETCHED = 'SET_FETCHED'
export const SET_ERROR = 'SET_ERROR'

export const addNote = (note) => ({ type: ADD_NOTE, payload: note })
export const setNotes = (notes) => ({ type: SET_NOTES, payload: notes })
export const setUser = (user) => ({ type: SET_USER, payload: user })
export const deleteNote = (id) => ({ type: DELETE_NOTE, payload: id })
export const setLoading = (loading) => ({ type: SET_LOADING, payload: loading })
export const setFetched = (fetched) => ({ type: SET_FETCHED, payload: fetched })
export const setError = (error) => ({ type: SET_ERROR, payload: error })
