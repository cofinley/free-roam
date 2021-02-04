import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StarFill } from "react-bootstrap-icons";
import { saveAs } from 'file-saver'

import './file-pane.scss'

import PageLink from '../links/PageLink'

const FilePane = props => {
  const s = useSelector(state => state)
  const blocks = useSelector(state => state.blocks)
  const favoriteBlockIds = useSelector(state => state.filePane.favoriteBlockIds)

  const save = () => {
    console.log(s)
    const jsonifiedState = JSON.stringify(s)
    const file = new Blob([jsonifiedState], { type: 'text/json;charset=utf-8' })
    saveAs(file, "free-roam.json");
  }

  const pageListItems = favoriteBlockIds.map(blockId => {
    const block = blocks[blockId]
    return (
      <PageLink
        pageBlockId={blockId}
        key={blockId}
        className="list-group-item list-group-item-action bg-dark text-light"
      >
        {block.text}
      </PageLink>
    )
  })

  return (
    <div className="file-pane">
      <Link to="/"><h2 className="text-light text-center">Free-roam</h2></Link>
      <div className="d-flex justify-content-center">
        <button className="btn btn-secondary mr-3">Load</button>
        <button className="btn btn-secondary" onClick={save}>Save</button>
      </div>
      <hr />
      <h5><StarFill color="white" width="15px" style={{ marginRight: "10px" }} />Shortcuts</h5>
      <div className="list-group list-group-flush mt-3">
        {pageListItems}
      </div>
    </div>
  )
}

export default FilePane