import { createSlice } from '@reduxjs/toolkit'

// State: { destination: [source1, source2] }

const linksSlice = createSlice({
  name: 'links',
  initialState: {
      'efgh': ['mnop']
  },
  reducers: {
    setLinksState: (state, action) => {
      const newState = action.payload
      if (newState && typeof newState === 'object') {
        return newState
      }
    },
    setLinks: (state, action) => {
      const { sourceBlockId, linkedBlockIds } = action.payload
      if (!sourceBlockId || !linkedBlockIds || !linkedBlockIds.length) {
        return
      }
      linkedBlockIds.map(linkedBlockId => {
        if (!(linkedBlockId in state)) {
          state[linkedBlockId] = []
        }
        if (!state[linkedBlockId].includes(sourceBlockId)) {
          state[linkedBlockId].push(sourceBlockId)
        }
        return true
      })
      const blockIdsLinkedBySourceBlockId = Object.entries(state)
        .filter(([linkedBlockId, sourceBlockIds]) => sourceBlockIds.includes(sourceBlockId))

      const blockIdsNoLongerLinkedBySourceBlockId = blockIdsLinkedBySourceBlockId
        .filter(([linkedBlockId, sourceBlockIds]) => !linkedBlockIds.includes(linkedBlockId))

      blockIdsNoLongerLinkedBySourceBlockId
        .map(([linkedBlockId, sourceBlockIds]) => {
          const index = state[linkedBlockId].indexOf(sourceBlockId)
          state[linkedBlockId].splice(index, 1)
          return true
        })
    }
  }
})

export const { setLinksState, setLinks } = linksSlice.actions
export default linksSlice.reducer