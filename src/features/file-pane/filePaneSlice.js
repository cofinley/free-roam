import { createSlice } from '@reduxjs/toolkit'

const filePaneSlice = createSlice({
  name: 'filePane',
  initialState: {
    favoriteBlockIds: ['abcd', 'efgh']
  },
  reducers: {
    toggleShortcut: (state, action) => {
      const { blockId } = action.payload
      const index = state.favoriteBlockIds.indexOf(blockId)
      if (index > -1) {
        state.favoriteBlockIds = state.favoriteBlockIds.filter(favoriteBlockId => blockId !== favoriteBlockId)
      } else {
        state.favoriteBlockIds.push(blockId)
      }
    }
  }
})

export const { toggleShortcut } = filePaneSlice.actions
export default filePaneSlice.reducer