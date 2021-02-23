import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { X } from "react-bootstrap-icons";

import './view-pane.scss'

import { pushView, popView } from './viewPaneSlice'
import Editor from '../editor/Editor'
import PageLink from '../links/PageLink';
import References from '../editor/References';

const ViewPane = props => {
  const blocks = useSelector(state => state.blocks)
  const links = useSelector(state => state.links)
  const views = useSelector(state => state.viewPane.views)
  const dispatch = useDispatch()

  const closeBlock = (type, blockId, event) => {
    dispatch(popView({ type, blockId }))
  }

  const header = (type, block) => {
    let output
    switch (type) {
      case 'page':
        output = 'Outline of:'
        break
      case 'block':
        output = 'Block outline of:'
        break
      case 'references':
        output = <span>References to: <PageLink blockId={block.id}>{block.text}</PageLink></span>
        break
      default:
        output = 'Outline of:'
        break
    }
    return output
  }

  const viewPaneBlocks = views.map(view => {
    const { type, blockId } = view
    if (!(blockId in blocks)) {
      return null
    }
    const block = blocks[blockId]
    const references = links.to[block.id]
    return (
      <div
        key={`${type}-${block.id}`}
        className="view-pane__section"
      >
        <div className="d-flex align-items-center">
          {header(type, block)}
          <div className="flex-grow-1" />
          {type === 'page' &&
            <button className="btn btn-dark btn-sm px-1 py-0" onClick={() => dispatch(pushView({ type: 'references', blockId }))}>{references.length}</button>
          }
          <X
            className="btn-close"
            onClick={closeBlock.bind(null, type, block.id)}
          />
        </div>
        {type === 'references'
         ? <References block={block} isMain />
         : <Editor blockId={block.id} isRoot isMain={false} />
        }
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