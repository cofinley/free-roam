import { createSlice } from '@reduxjs/toolkit'

import initialState from '../../redux/initialState'

const viewPaneSlice = createSlice({
  name: 'viewPane',
  initialState: initialState.viewPane,
  reducers: {
    setViewPaneState: (state, action) => {
      const newState = action.payload
      if (newState && 'views' in newState) {
        return newState
      }
    },
    pushView: (state, action) => {
      const { type, blockId } = action.payload
      const viewExists = state.views.find(view => view.type === type && view.blockId === blockId)
      if (!viewExists) {
        state.views.unshift(action.payload)
      }
    },
    popView: (state, action) => {
      const { type, blockId } = action.payload
      state.views = state.views.filter(view => (type !== 'all' && view.type !== type) || view.blockId !== blockId)
    }
  }
})

export const { setViewPaneState, pushView, popView } = viewPaneSlice.actions
export default viewPaneSlice.reducer