import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import './block.scss'

import EditBlock from './EditBlock'
import RenderedBlock from './RenderedBlock'

const Block = ({ block, isMain, isTitle }) => {
  const focusedBlock = useSelector(state => state.editor.focusedBlock)
  const [editing, setEditing] = useState(focusedBlock.isMain === isMain && focusedBlock.blockId === block.id)
  const [cursorCaret, setCursorCaret] = useState({ offsetX: null, offsetY: null, width: null })

  const edit = event => {
    const clickPosX = event.clientX
    const clickPosY = event.clientY
    const blockX = event.currentTarget.offsetLeft
    const blockY = event.currentTarget.offsetTop
    const offsetX = clickPosX - blockX
    const offsetY = clickPosY - blockY
    const width = event.currentTarget.offsetWidth
    setCursorCaret({ offsetX, offsetY, width })
    setEditing(true)
  }

  const render = event => {
    setEditing(false)
  }

  const isFocusedBlock = focusedBlock.blockId
    && focusedBlock.blockId === block.id
    && focusedBlock.isMain === isMain
    && focusedBlock.caretPos

  if (isFocusedBlock && !editing) {
    setEditing(true)
  }

  return (
      <div className="block">
      {editing
        ?
          <EditBlock
            block={block}
            isMain={isMain}
            isTitle={isTitle}
            cursorCaret={cursorCaret}
            setCursorCaret={setCursorCaret}
            onRender={render}
          />
        :
          <RenderedBlock
            block={block}
            isTitle={isTitle}
            onEdit={edit}
          />
      }
    </div>
  )
}

export default Block