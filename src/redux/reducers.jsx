import {
  ADD_NOTE,
  SET_NOTES,
  SET_USER,
  DELETE_NOTE,
  SET_LOADING,
  SET_FETCHED,
  SET_ERROR,
} from './actions'

const initialState = {
  notes: [],
  user: null,
  loading: true,
  fetched: false,
  error: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return { ...state, notes: [...state.notes, action.payload] }

    case SET_NOTES:
      return { ...state, notes: action.payload, loading: false, error: null }

    case SET_USER:
      return { ...state, user: action.payload, loading: false, error: null }

    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      }

    case SET_LOADING:
      return { ...state, loading: action.payload }

    case SET_FETCHED:
      return { ...state, fetched: action.payload }

    case SET_ERROR:
      return { ...state, error: action.payload }

    default:
      return state
  }
}

export default reducer
