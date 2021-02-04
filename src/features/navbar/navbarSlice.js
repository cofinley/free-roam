import { createSlice } from '@reduxjs/toolkit'

const navbarSlice = createSlice({
  name: 'navbar',
  initialState: {
    searchQuery: ''
  },
  reducers: {
    updateSearchQuery: (state, action) => {
      const { query } = action.payload
      state.searchQuery = query
    }
  }
})

export const { updateSearchQuery, removeShortcut } = navbarSlice.actions
export default navbarSlice.reducer