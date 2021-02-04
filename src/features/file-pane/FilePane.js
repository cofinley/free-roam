import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StarFill } from "react-bootstrap-icons";

import './file-pane.scss'

import PageLink from '../links/PageLink'

const FilePane = props => {

  const blocks = useSelector(state => state.blocks)
  const favoriteBlockIds = useSelector(state => state.filePane.favoriteBlockIds)

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
      <hr />
      <h5><StarFill color="white" width="15px" style={{ marginRight: "10px" }} />Shortcuts</h5>
      <div className="list-group list-group-flush mt-3">
        {pageListItems}
      </div>
    </div>
  )
}

export default FilePane