import React from 'react'

import { CaretRightFill, CaretDownFill } from 'react-bootstrap-icons'

const BlockActions = ({ block, show }) => {
  return (
    <div className="block-actions-container">
      <span className="block-actions block-actions--toggle">
        {show &&
          <CaretDownFill color="white" />
        }
        {!show &&
          <CaretRightFill color="white" />
        }
      </span>
      <span className="block-actions block-actions--bullet">•</span>
    </div>
  )
}

export default BlockActions