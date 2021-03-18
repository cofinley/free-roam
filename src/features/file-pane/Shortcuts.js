import React from 'react'
import { useSelector } from 'react-redux'
import { StarFill } from "react-bootstrap-icons";

import PageLink from '../links/PageLink'

function Shortcuts(props) {
  const blocks = useSelector(state => state.blocks)
  const favoriteBlockIds = useSelector(state => state.filePane.favoriteBlockIds)

  const pageListItems = favoriteBlockIds.map(blockId => {
    const block = blocks[blockId]
    return (
      <PageLink
        blockId={blockId}
        key={blockId}
        className="file-pane__item"
      >
        {block.text}
      </PageLink>
    )
  })

  return (
    <div>
      <h5><StarFill color="white" width="15px" style={{ marginRight: "10px" }} />Shortcuts</h5>
      <div className="list-group list-group-flush mt-3">
        {pageListItems}
      </div>
    </div>
  )
}

export default Shortcuts