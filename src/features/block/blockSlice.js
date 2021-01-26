import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const DEFAULT_TEXT = 'Click here to edit'

const Block = ({id = uuidv4(), parentId = null, text, childrenIds = []}={}) => (
  {
    id,
    parentId,
    text,
    childrenIds
  }
)


const blocksSlice = createSlice({
  name: 'blocks',
  initialState: {
    'abcd': { id: 'abcd', parentId: null, text: 'Hello World', childrenIds: ['efgh', 'ijkl', 'mnop'] },
    'efgh': { id: 'efgh', parentId: 'abcd', text: 'Lorem ipsum', childrenIds: [] },
    'ijkl': { id: 'ijkl', parentId: 'abcd', text: 'Normal *italics* **bold** ***bold italics***', childrenIds: [] },
    'mnop': { id: 'mnop', parentId: 'abcd', text: 'Link to [[Lorem ipsum]]', childrenIds: [] }
  },
  reducers: {
    addBlock: (state, action) => {
      const { parentId, text } = action.payload
      const block = Block({ text })
      if (!parentId) {
        const childBlock = Block({ parentId: block.id, text: DEFAULT_TEXT })
        block.childrenIds.push(childBlock.id)
        state[childBlock.id] = childBlock
      } else {
        block.parentId = parentId
        const parentBlock = state[parentId]
        parentBlock.childrenIds.push(block.id)
      }
      state[block.id] = block
      return block
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
        block.text = text || block.text
        state[blockId] = block
      }
    },
    searchForBlocks: (state, action) => {
      const { query, exact } = action.payload
      if (!query) {
        return
      }
      const searchResults = Array.from(state)
        .filter(([blockId, block]) => {
          if (exact) {
            return block.text === query
          }
          return block.text.indexOf(query) !== -1
        })
        .map(([blockId, block]) => blockId)
      return searchResults
    },
    getOrAddBlock: (state, action) => {
      const { text, parentId } = action.payload
      const existingBlock = blocksSlice.caseReducers.getBlockByText(state, { text })
      if (existingBlock) {
        return existingBlock
      }
      return blocksSlice.caseReducers.addBlock(state, { text, parentId })
    }
  }
})

export const { getBlockByText, addBlock, updateBlock, searchForBlocks, getOrAddBlock } = blocksSlice.actions
export default blocksSlice.reducer