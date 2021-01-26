import { configureStore } from '@reduxjs/toolkit'
import blocksReducer from '../features/block/blockSlice'
import filePaneReducer from '../features/file-pane/filePaneSlice'
import viewPaneReducer from '../features/view-pane/viewPaneSlice'
import navbarReducer from '../features/navbar/navbarSlice'

const store = configureStore({
  reducer: {
    blocks: blocksReducer,
    filePane: filePaneReducer,
    viewPane: viewPaneReducer,
    navbar: navbarReducer
  }
})

export default store