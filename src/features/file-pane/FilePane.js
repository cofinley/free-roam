import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './file-pane.scss'

import { addBlock, BlockModel } from '../block/blockSlice'
import PageLink from '../links/PageLink'

const FilePane = props => {

  const dispatch = useDispatch()
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
      <button className="btn btn-dark mx-auto" type="button" onClick={() => dispatch(addBlock(BlockModel({})))}>New Page</button>
      <div className="list-group list-group-flush mt-3">
        {pageListItems}
      </div>
    </div>
  )
}

export default FilePane