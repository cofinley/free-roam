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
    updateFocusedBlock: (state, action) => {
      state.focusedBlock = action.payload
    }
  }
})

export const { updateFocusedBlock } = editorSlice.actions
export default editorSlice.reducer