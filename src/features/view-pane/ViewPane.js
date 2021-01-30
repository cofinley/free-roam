import React from 'react'
import { useSelector } from 'react-redux'

import './view-pane.scss'

import Editor from '../editor/Editor'

const ViewPane = props => {
  const blocks = useSelector(state => state.blocks)
  const blockIds = useSelector(state => state.viewPane.blockIds)

  const viewPaneBlocks = blockIds.map(blockId => {
    const block = blocks[blockId]
    return (
      <div key={block.id}>
        Outline of:
        <Editor blockId={block.id} isRoot isMain={false} />
      </div>
    )
  })
  return (
    <div className="view-pane">
      {viewPaneBlocks}
    </div>
  )
}

export default ViewPane