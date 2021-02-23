import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

import Editor from '../editor/Editor'
import { addBlock } from '../block/blockSlice'
import { BlockModel, DAILY_NOTE_STORAGE_FORMAT, DAILY_NOTE_DISPLAY_FORMAT } from '../block/blockModel'

import './daily-notes.scss'

dayjs.extend(advancedFormat)

const DailyNotes = props => {
  const dispatch = useDispatch()
  const blocks = useSelector(state => state.blocks)
  const dailyNoteBlocks = Object.values(blocks)
    .filter(block => !!block.dailyNote)
    .sort((blockA, blockB) => blockA.dailyNote.localeCompare(blockB.dailyNote))
    .reverse()

  // Create today's note if it doesn't exist
  const today = dayjs()
  const todayFormattedDate = today.format(DAILY_NOTE_DISPLAY_FORMAT)
  let todayDailyNoteBlock = dailyNoteBlocks.find(block => block.text === todayFormattedDate)
  if (!todayDailyNoteBlock) {
    todayDailyNoteBlock = BlockModel({ text: todayFormattedDate, dailyNote: today.format(DAILY_NOTE_STORAGE_FORMAT) }, blocks)
    dispatch(addBlock(todayDailyNoteBlock))
  }

  const dailyNoteEditors = dailyNoteBlocks
    .map(block => <Editor key={block.id} blockId={block.id} isMain isRoot />)

  return (
    <div className="daily-notes">
      {dailyNoteEditors}
    </div>
  )
}

export default DailyNotes