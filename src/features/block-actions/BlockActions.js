import React from 'react'
import { CaretRightFill, CaretDownFill } from 'react-bootstrap-icons'

import './block-actions.scss'

import PageLink from '../links/PageLink'

const BlockActions = ({ block, foldBlock, setFoldBlock }) => {
  return (
    <div className="block-actions-container">
      <span className="block-actions block-actions--toggle">
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
        <span className="block-actions block-actions--bullet">•</span>
      </PageLink>
    </div>
  )
}

export default BlockActions