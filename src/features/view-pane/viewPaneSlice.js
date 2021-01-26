import { createSlice } from '@reduxjs/toolkit'

const viewPaneSlice = createSlice({
  name: 'viewPane',
  initialState: {
    blockIds: ['abcd', 'efgh', 'ijkl']
  },
  reducers: {
    pushBlock: (state, action) => {
      const { blockId } = action.payload
      state.blockIds.push(blockId)
    },
    popBlock: (state, action) => {
      const { blockId } = action.payload
      const index = state.favoriteBlockIds.indexOf(blockId)
      if (index > -1) {
        state.blockIds.splice(blockId, 1)
      }
    }
  }
})

export const { pushBlock, popBlock } = viewPaneSlice.actions
export default viewPaneSlice.reducer