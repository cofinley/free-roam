import React from 'react'

import { CaretRightFill, CaretDownFill } from 'react-bootstrap-icons'

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
      <span className="block-actions block-actions--bullet">•</span>
    </div>
  )
}

export default BlockActions