import { useSelector, useDispatch } from 'react-redux'
import { saveAs } from 'file-saver'

import './io.scss'

import { setBlocksState } from "../block/blockSlice";
import { setEditorState } from "../editor/editorSlice";
import { setFilePaneState } from "../file-pane/filePaneSlice";
import { setLinksState } from "../links/linksSlice";
import { setNavbarState } from "../navbar/navbarSlice";
import { setViewPaneState } from "../view-pane/viewPaneSlice";

const IO = props => {
  const dispatch = useDispatch()
  const s = useSelector(state => state)

  const load = event => {
    event.preventDefault()
    const reader = new FileReader()
    reader.onload = event => {
      const newState = JSON.parse(event.target.result)
      if ('blocks' in newState) {
        dispatch(setBlocksState(newState.blocks))
      }
      if ('editor' in newState) {
        dispatch(setEditorState(newState.editor))
      }
      if ('filePane' in newState) {
        dispatch(setFilePaneState(newState.filePane))
      }
      if ('links' in newState) {
        dispatch(setLinksState(newState.links))
      }
      if ('navbar' in newState) {
        dispatch(setNavbarState(newState.navbar))
      }
      if ('viewPane' in newState) {
        dispatch(setViewPaneState(newState.viewPane))
      }
    }
    reader.readAsText(event.target.files[0])
  }

  const save = () => {
    const jsonifiedState = JSON.stringify(s)
    const file = new Blob([jsonifiedState], { type: 'text/plain;charset=utf-8' })
    saveAs(file, "free-roam.json");
  }

  return (
    <div className="d-flex justify-content-center">
      <label className="load-button-input mr-3">
        <input type="file" className="btn btn-secondary" accept=".json" onChange={load} />
      </label>
      <button className="btn btn-secondary" onClick={save}>Save</button>
    </div>
  )
}

export default IO