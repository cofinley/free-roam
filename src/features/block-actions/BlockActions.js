import React from 'react'
import { CaretRightFill, CaretDownFill } from 'react-bootstrap-icons'

import './block-actions.scss'

import PageLink from '../links/PageLink'

const BlockActions = ({ block, hasChildren, foldBlock, setFoldBlock }) => {
  return (
    <div className="block-actions-container">
      <span className={`block-actions block-actions--toggle${hasChildren ? '' : ' hidden'}`}>
        {foldBlock &&
          <CaretRightFill color="white" onClick={() => setFoldBlock(false)} />
        }
        {!foldBlock &&
          <CaretDownFill color="white" onClick={() => setFoldBlock(true)} />
        }
      </span>
      <PageLink
        pageBlockId={block.id}
        noStyling
      >
        <div className={`block-actions block-actions--bullet${foldBlock && hasChildren ? ' fold' : ''}`}>
          <span>•</span>
        </div>
      </PageLink>
    </div>
  )
}

export default BlockActions