import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { X } from "react-bootstrap-icons";

import './view-pane.scss'

import { popBlock } from './viewPaneSlice'
import Editor from '../editor/Editor'

const ViewPane = props => {
  const blocks = useSelector(state => state.blocks)
  const blockIds = useSelector(state => state.viewPane.blockIds)
  const dispatch = useDispatch()

  const closeBlock = (blockId, event) => {
    dispatch(popBlock({ blockId }))
  }

  const viewPaneBlocks = blockIds.map(blockId => {
    const block = blocks[blockId]
    return (
      <div
        key={block.id}
        className="view-pane__section"
      >
        <div className="d-flex justify-content-between align-items-center">
          Outline of:
          <X
            className="btn-close"
            onClick={closeBlock.bind(null, block.id)}
          />
        </div>
        <Editor blockId={block.id} isRoot isMain={false} />
      </div>
    )
  })
  return (
    <div className="pane view-pane">
      {viewPaneBlocks}
    </div>
  )
}

export default ViewPane