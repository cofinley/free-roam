import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import PageLink from '../links/PageLink'
import Editor from './Editor'

const References = ({ block, isMain }) => {
  const [showUnlinkedRefs, setShowUnlinkedRefs] = useState(false)
  const links = useSelector(state => state.links)
  const blocks = useSelector(state => state.blocks)
  const references = links[block.id]

  const linkedReferences = () => {
    if (block.parentId || !references || !references.length) {
      return
    }
    return references.map(referenceBlockId => {
      const referenceBlock = blocks[referenceBlockId]
      return (
        <div>
          <PageLink pageBlockId={referenceBlockId}><h4>{referenceBlock.text}</h4></PageLink>
          <Editor
            blockId={referenceBlockId}
            isRoot={false}
          />
        </div>
      )
    })
  }

  const unlinkedReferences = () => {
    if (block.parentId || !showUnlinkedRefs) {
      return
    }
    /* eslint-disable no-useless-escape */
    const titlePat = new RegExp(`(?<![\[\w])${block.text}(?![\[\w]+)`, 'gi')
    const references = Object.values(blocks)
      .filter(otherBlock => otherBlock.parentId && titlePat.test(otherBlock.text))
      .map(otherBlock => (
        <div>
          <PageLink pageBlockId={otherBlock.id}><h4>{otherBlock.text}</h4></PageLink>
          <Editor
            blockId={otherBlock.id}
            isRoot={false}
          />
        </div>
      ))
    if (!references.length) {
      return <span>No unlinked references</span>
    }
    return references
  }

  return (
    <div>
      {block.parentId === null && (references && references.length > 0) && isMain &&
        <div className="references references--linked">
          <b>Linked References</b>
          {linkedReferences()}
        </div>
      }
      {block.parentId === null && isMain &&
        <div className="references">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowUnlinkedRefs(!showUnlinkedRefs)}
          >
            Unlinked References
          </button>
          {showUnlinkedRefs &&
            <div className="references references--unlinked">
              {unlinkedReferences()}
            </div>
          }
        </div>
      }
    </div>
  )
}

export default References