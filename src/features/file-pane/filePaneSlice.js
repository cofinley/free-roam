import { createSlice } from '@reduxjs/toolkit'

const filePaneSlice = createSlice({
  name: 'filePane',
  initialState: {
    favoriteBlockIds: ['abcd', 'efgh']
  },
  reducers: {
    addShortcut: (state, action) => {
      const { blockId } = action.payload
      state.favoriteBlockIds.push(blockId)
    },
    removeShortcut: (state, action) => {
      const { blockId } = action.payload
      const index = state.favoriteBlockIds.indexOf(blockId)
      if (index > -1) {
        state.favoriteBlockIds.splice(blockId, 1)
      }
    }
  }
})

export const { addShortcut, removeShortcut } = filePaneSlice.actions
export default filePaneSlice.reducer