import { nanoid } from '@reduxjs/toolkit'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

export const DAILY_NOTE_DISPLAY_FORMAT = 'MMMM Do, YYYY'
export const DAILY_NOTE_STORAGE_FORMAT = 'YYYY-MM-DD'
const ID_LENGTH = 8

export const BlockModel = (
  {
    id = nanoid(ID_LENGTH),
    parentId = null,
    text,
    childrenIds = [],
    created = Date.now(),
    dailyNote = null
  } = {},
  blocks) => {
  const isPage = !parentId
  if (isPage) {
    if (!dailyNote) {
      const dailyNoteTitleDate = dayjs(text, DAILY_NOTE_DISPLAY_FORMAT)
      if (dailyNoteTitleDate.isValid()) {
       dailyNote = dailyNoteTitleDate.format(DAILY_NOTE_STORAGE_FORMAT)
      }
    }
  }
  if (dailyNote) {
    id = dailyNote
  } else if (id in blocks) {
    // Reroll id if collision (unlikely)
    while (id in blocks) {
      id = nanoid(ID_LENGTH)
    }
  }
  return {
    id,
    parentId,
    text,
    childrenIds,
    created,
    updated: null,
    dailyNote
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

export const serialize = (block, blocks) => {
  const { childrenIds, ...newBlock} = block
  if (!childrenIds.length) {
    return newBlock
  }
  return {
    ...newBlock,
    children: childrenIds.map(childId => {
      const childBlock  = blocks[childId]
      return serialize(childBlock, blocks)
    })
  }
}

export const flattenTreeIds = (block, blocks) => {
  if (!block.childrenIds.length) {
    return block.id
  }
  return [block.id].concat(...block.childrenIds.map(childId => flattenTreeIds(blocks[childId], blocks)))
}