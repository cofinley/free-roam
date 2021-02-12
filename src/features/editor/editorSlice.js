import { createSlice } from "@reduxjs/toolkit";

const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    focusedBlock: {
        blockId: '',
        isMain: true,
        caretPos: 0
    }
  },
  reducers: {
    setEditorState: (state, action) => {
      const newState = action.payload
      if (newState && 'focusedBlock' in newState) {
        return newState
      }
    },
    updateFocusedBlock: (state, action) => {
      state.focusedBlock = action.payload
    }
  }
})

export const { setEditorState, updateFocusedBlock } = editorSlice.actions
export default editorSlice.reducer