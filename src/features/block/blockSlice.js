import { createSlice } from '@reduxjs/toolkit'

import { BlockModel } from './blockModel'

const DEFAULT_TEXT = 'Click here to edit'

const blocksSlice = createSlice({
  name: 'blocks',
  initialState: {
    'abcd': { id: 'abcd', parentId: null, text: 'Hello World', childrenIds: ['ijkl', 'mnop'] },
    'efgh': { id: 'efgh', parentId: null, text: 'Lorem ipsum', childrenIds: ['qrst'] },
    'ijkl': { id: 'ijkl', parentId: 'abcd', text: 'Normal *italics* **bold** ***bold italics***', childrenIds: [] },
    'mnop': { id: 'mnop', parentId: 'abcd', text: 'Link to [[Lorem ipsum]]', childrenIds: ['uvwx', 'a1'] },
    'qrst': { id: 'qrst', parentId: 'efgh', text: 'Click here to edit', childrenIds: [] },
    'uvwx': { id: 'uvwx', parentId: 'mnop', text: "I'm a third layer block", childrenIds: ['a2'] },
    'a1': { id: 'a1', parentId: 'mnop', text: "I'm another third layer block", childrenIds: [] },
    'a2': { id: 'a2', parentId: 'uvwx', text: "I'm a fourth layer block", childrenIds: [] },
    'a3': BlockModel({ id: 'a3', text: 'February 17th, 2021', childrenIds: ['a4'] }),
    'a4': { id: 'a4', parentId: 'a3', text: 'Click here to edit', childrenIds: [] },
  },
  reducers: {
    setBlocksState: (state, action) => {
      const newState = action.payload
      if (newState && typeof newState === 'object') {
        return newState
      }
    },
    addBlock: (state, action) => {
      const block = action.payload
      if (!block.parentId) {
        const childBlock = BlockModel({ parentId: block.id, text: DEFAULT_TEXT })
        block.childrenIds.push(childBlock.id)
        state[childBlock.id] = childBlock
      } else {
        const parentBlock = state[block.parentId]
        parentBlock.childrenIds.push(block.id)
      }
      state[block.id] = block
    },
    removeBlock: (state, action) => {
      const { blockId } = action.payload
      const block = state[blockId]
      // Only allowed on leaves
      if (block.childrenIds.length) {
        return
      }
      const parentBlock = state[block.parentId]
      state[block.parentId].childrenIds = parentBlock.childrenIds.filter(childBlockId => childBlockId !== blockId)
      delete state[blockId]
    },
    changeParent: (state, action) => {
      const { blockId, parentId } = action.payload
      const block = state[blockId]
      block.parentId = parentId
      const parentBlock = state[parentId]
      parentBlock.childrenIds.push(blockId)
    },
    updateBlock: (state, action) => {
      const { blockId, parentId, childrenIds, text } = action.payload
      const block = state[blockId]
      if (block) {
        block.parentId = parentId || block.parentId
        block.childrenIds = childrenIds || block.childrenIds
        const currentText = block.text
        block.text = typeof text === 'string' ? text : currentText
        block.updated = Date.now()
        state[blockId] = block
        if (!block.parentId) {
          blocksSlice.caseReducers.changeTitle(state, { payload: { currentTitle: currentText, newTitle: text } })
        }
      }
    },
    changeTitle: (state, action) => {
      const { currentTitle, newTitle } = action.payload
      /* eslint-disable no-useless-escape */
      const linkPat = new RegExp(`\[\[${currentTitle}\]\]`, 'g')
      Object.values(state)
        .map(block => {
          if (linkPat.test(block.text)) {
            state[block.id].text = block.text.replace(`[[${currentTitle}]]`, `[[${newTitle}]]`)
          }
          return true
        })
    },
    repositionBlock: (state, action) => {
      const { blockId, direction } = action.payload
      const block = state[blockId]
      const parentBlock = state[block.parentId]
      const blockIndex = parentBlock.childrenIds.indexOf(block.id)
      if (direction === 'forward') {
        if (blockIndex > 0) {
          const previousSibling = state[parentBlock.childrenIds[blockIndex-1]]
          parentBlock.childrenIds.splice(blockIndex, 1)
          previousSibling.childrenIds.push(blockId)
          block.parentId = previousSibling.id
        }
      } else {
        const parentBlock = state[block.parentId]
        if (parentBlock.parentId) {
          const grandParentBlock = state[parentBlock.parentId]
          const parentBlockIndex = grandParentBlock.childrenIds.indexOf(parentBlock.id)
          if (parentBlockIndex !== -1) {
            parentBlock.childrenIds.splice(blockIndex, 1)
            grandParentBlock.childrenIds.splice(parentBlockIndex + 1, 0, blockId)
            block.parentId = grandParentBlock.id
          }
        }
      }
    },
    makeSibling: (state, action) => {
      const { firstSiblingBlockId, secondSiblingBlockId } = action.payload
      const firstSibling = state[firstSiblingBlockId]
      if (firstSibling.parentId) {
        const secondSibling = state[secondSiblingBlockId]
        if (secondSibling.parentId) {
          const secondSiblingParent = state[secondSibling.parentId]
          const secondSiblingIndex = secondSiblingParent.childrenIds.indexOf(secondSiblingBlockId)
          secondSiblingParent.childrenIds.splice(secondSiblingIndex, 1)
        }
        const firstSiblingParent = state[firstSibling.parentId]
        const firstSiblingIndex = firstSiblingParent.childrenIds.indexOf(firstSiblingBlockId)
        state[firstSiblingParent.id].childrenIds.splice(firstSiblingIndex+1, 0, secondSiblingBlockId)
      }
    }
  }
})

export const {
  setBlocksState,
  getBlockByText,
  addBlock,
  removeBlock,
  updateBlock,
  repositionBlock,
  makeSibling
} = blocksSlice.actions
export default blocksSlice.reducer