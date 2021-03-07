import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { X, CaretRightFill, CaretDownFill } from 'react-bootstrap-icons'

import { pushView, popView } from './viewPaneSlice'
import Editor from '../editor/Editor'
import PageLink from '../links/PageLink'
import References from '../editor/References'

const ViewPaneBlock = ({ view }) => {
  const [showBlock, setShowBlock] = useState(true)
  const blocks = useSelector(state => state.blocks)
  const links = useSelector(state => state.links)
  const dispatch = useDispatch()

  const closeBlock = (type, blockId, event) => {
    dispatch(popView({ type, blockId }))
  }

  const header = (type, block, show) => {
    let output
    switch (type) {
      case 'page':
        output = <span>Outline of {show ? ':' : <b><PageLink blockId={block.id}>{block.text}</PageLink></b>}</span>
        break
      case 'block':
        output = <span>Block outline of {show ? ':' : <b><PageLink blockId={block.id}>{block.text}</PageLink></b>}</span>
        break
      case 'references':
        output = <span>References to: <PageLink blockId={block.id}>{block.text}</PageLink></span>
        break
      default:
        output = <span>Outline of</span>
        break
    }
    return output
  }

  const { type, blockId } = view
  if (!(blockId in blocks)) {
    return null
  }
  const block = blocks[blockId]
  const references = links.to[block.id] || []
  return (
    <div
      key={`${type}-${block.id}`}
      className="view-pane__section"
    >
      <div className="d-flex align-items-center">
        <span className="references__toggle no-select" onClick={() => setShowBlock(state => !state)}>
          {showBlock
            ? <CaretDownFill color="white" size={12} />
            : <CaretRightFill color="white" size={12} />
          }
          {header(type, block, showBlock)}
        </span>
        <div className="flex-grow-1" />
        {type === 'page' &&
          <button
            className="btn btn-dark btn-sm px-1 py-0"
            onClick={() => dispatch(pushView({ type: 'references', blockId }))}
          >
            {references.length}
          </button>
        }
        <X
          className="btn-close"
          onClick={closeBlock.bind(null, type, block.id)}
        />
      </div>
      {showBlock
        ? type === 'references'
          ? <References block={block} isMain />
          : <Editor blockId={block.id} isRoot isMain={false} />
        : null
      }
    </div>
  )
}

export default ViewPaneBlock