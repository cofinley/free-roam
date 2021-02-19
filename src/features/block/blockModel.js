import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const DAILY_NOTE_FORMAT = 'MMMM Do, YYYY'

export const BlockModel = ({ id = uuidv4(), parentId = null, text, childrenIds = [], created = Date.now(), isDailyNote = false } = {}) => {
  const isPage = !parentId
  if (isPage) {
    const validDailyNoteTitle = dayjs(text, DAILY_NOTE_FORMAT).isValid()
    if (validDailyNoteTitle) {
      isDailyNote = true
    }
  }
  return {
    id,
    parentId,
    text,
    childrenIds,
    created,
    updated: null,
    isDailyNote
  }
}

export const getPage = (block, blocks) => {
  if (!block.parentId) {
    return block
  }
  const parentBlock = blocks[block.parentId]
  return getPage(parentBlock, blocks)
}

export const getPrevSibling = (block, blocks) => {
  const parentBlock = blocks[block.parentId]
  const blockIndex = parentBlock.childrenIds.indexOf(block.id)
  if (blockIndex < 1) {
    return null
  }
  const prevSiblingBlock = blocks[parentBlock.childrenIds[blockIndex - 1]]
  return prevSiblingBlock
}

export const getLastChildLeaf = (block, blocks) => {
  if (!block.childrenIds.length) {
    return block
  }
  const lastChildBlock = blocks[block.childrenIds.slice(-1)]
  return getLastChildLeaf(lastChildBlock, blocks)
}

export const getNextBlockUp = (block, blocks) => {
  const prevSibling = getPrevSibling(block, blocks)
  if (prevSibling) {
    if (prevSibling.childrenIds.length) {
      return getLastChildLeaf(prevSibling, blocks)
    } else {
      return prevSibling
    }
  } else {
    const parentBlock = blocks[block.parentId]
    return parentBlock
  }
}
