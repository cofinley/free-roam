import { createSlice } from '@reduxjs/toolkit'

import initialState from "../../redux/initialState";

const filePaneSlice = createSlice({
  name: 'filePane',
  initialState: initialState.filePane,
  reducers: {
    setFilePaneState: (state, action) => {
      const newState = action.payload
      if (newState && 'favoriteBlockIds' in newState) {
        return newState
      }
    },
    toggleShortcut: (state, action) => {
      const { blockId } = action.payload
      const index = state.favoriteBlockIds.indexOf(blockId)
      if (index > -1) {
        state.favoriteBlockIds = state.favoriteBlockIds.filter(favoriteBlockId => blockId !== favoriteBlockId)
      } else {
        state.favoriteBlockIds.push(blockId)
      }
    },
    removeShortcut: (state, action) => {
      const { blockId } = action.payload
      state.favoriteBlockIds = state.favoriteBlockIds.filter(favoriteBlockId => favoriteBlockId !== blockId)
    }
  }
})

export const { setFilePaneState, toggleShortcut, removeShortcut } = filePaneSlice.actions
export default filePaneSlice.reducer