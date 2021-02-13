import { createSlice } from '@reduxjs/toolkit'

const viewPaneSlice = createSlice({
  name: 'viewPane',
  initialState: {
    blockIds: ['abcd']
  },
  reducers: {
    setViewPaneState: (state, action) => {
      const newState = action.payload
      if (newState && 'blockIds' in newState) {
        return newState
      }
    },
    pushBlock: (state, action) => {
      const { blockId } = action.payload
      if (!state.blockIds.includes(blockId)) {
        state.blockIds.unshift(blockId)
      }
    },
    popBlock: (state, action) => {
      const { blockId } = action.payload
      state.blockIds = state.blockIds.filter(openBlockId => openBlockId !== blockId)
    }
  }
})

export const { setViewPaneState, pushBlock, popBlock } = viewPaneSlice.actions
export default viewPaneSlice.reducer