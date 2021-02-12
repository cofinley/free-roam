import { configureStore } from '@reduxjs/toolkit'
import blocksReducer from '../features/block/blockSlice'
import filePaneReducer from '../features/file-pane/filePaneSlice'
import viewPaneReducer from '../features/view-pane/viewPaneSlice'
import navbarReducer from '../features/navbar/navbarSlice'
import linksReducer from '../features/links/linksSlice'
import editorReducer from '../features/editor/editorSlice'

const store = configureStore({
  reducer: {
    blocks: blocksReducer,
    filePane: filePaneReducer,
    viewPane: viewPaneReducer,
    navbar: navbarReducer,
    links: linksReducer,
    editor: editorReducer
  }
})

export default store