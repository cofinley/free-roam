import React from 'react'
import { useSelector } from 'react-redux'

import Editor from '../editor/Editor'

const DailyNotes = props => {
  const blocks = useSelector(state => state.blocks)
  const dailyNoteBlocks = Object.values(blocks)
    .filter(block => block.isDailyNote)
    .map(block => <Editor key={block.id} blockId={block.id} isMain isRoot />)

  return (
    <div>
      {dailyNoteBlocks}
    </div>
  )
}

export default DailyNotes