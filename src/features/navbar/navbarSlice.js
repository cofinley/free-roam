import { createSlice } from '@reduxjs/toolkit'

const navbarSlice = createSlice({
  name: 'navbar',
  initialState: {
    searchQuery: ''
  },
  reducers: {
    setNavbarState: (state, action) => {
      const newState = action.payload
      if (newState && 'searchQuery' in newState) {
        return newState
      }
    },
    updateSearchQuery: (state, action) => {
      const { query } = action.payload
      state.searchQuery = query
    }
  }
})

export const { setNavbarState, updateSearchQuery, removeShortcut } = navbarSlice.actions
export default navbarSlice.reducer