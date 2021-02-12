import { createSlice } from '@reduxjs/toolkit'

/* State:
{
  to: { destination: [source1, source2] }},
  from: { source1: [destination], source2: [destination] }}
}

'to' holds backlinks, 'from' holds source blocks and helps build 'to'
*/

const linksSlice = createSlice({
  name: 'links',
  initialState: {
    to: {
      'efgh': ['mnop']
    },
    from: {
      'mnop': ['efgh']
    }
  },
  reducers: {
    setLinksState: (state, action) => {
      const newState = action.payload
      if (newState && 'to' in newState && 'from' in newState) {
        return newState
      }
    },
    setLinks: (state, action) => {
      const { sourceBlockId, linkedBlockIds } = action.payload
      if (!sourceBlockId || !linkedBlockIds || !linkedBlockIds.length) {
        return
      }

      let addedLinks

      if (sourceBlockId in state.from) {
        if (JSON.stringify(state.from[sourceBlockId].sort()) === JSON.stringify(linkedBlockIds.sort())) {
          return
        }

        const removedLinks = state.from[sourceBlockId].filter(destinationBlockId => !linkedBlockIds.includes(destinationBlockId))
        if (removedLinks.length) {
          removedLinks.map(destinationBlockId => {
            state.to[destinationBlockId] = state.to[destinationBlockId].filter(_sourceBlockId => sourceBlockId !== _sourceBlockId)
            return true
          })
        }

        addedLinks = linkedBlockIds.filter(destinationBlockId => !state.from[sourceBlockId].includes(destinationBlockId))
      } else {
        addedLinks = linkedBlockIds
      }

      if (addedLinks.length) {
        addedLinks.map(destinationBlockId => {
          if (!(destinationBlockId in state.to)) {
            state.to[destinationBlockId] = []
          }
          state.to[destinationBlockId].push(sourceBlockId)
          return true
        })
      }

      state.from[sourceBlockId] = linkedBlockIds
    }
  }
})

export const { setLinksState, setLinks } = linksSlice.actions
export default linksSlice.reducer