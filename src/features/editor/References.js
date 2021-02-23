import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { getPage } from '../block/blockModel';

import PageLink from '../links/PageLink'
import Editor from './Editor'

const References = ({ block, isMain }) => {
  const [showUnlinkedRefs, setShowUnlinkedRefs] = useState(false)
  const links = useSelector(state => state.links)
  const blocks = useSelector(state => state.blocks)
  const references = links.to[block.id]

  const linkedReferences = () => {
    if (block.parentId || !references || !references.length) {
      return
    }
    return references.map(referenceBlockId => {
      if (!(referenceBlockId in blocks)) {
        return null
      }
      const referenceBlock = blocks[referenceBlockId]
      const referenceBlockPage = getPage(referenceBlock, blocks)
      return (
        <div key={referenceBlockId}>
          <PageLink blockId={referenceBlockPage.id}><h5>{referenceBlockPage.text}</h5></PageLink>
          <div className="reference-container">
            <Editor
              blockId={referenceBlockId}
              isRoot={false}
              fold
              showBreadcrumbs
            />
          </div>
        </div>
      )
    })
  }

  const unlinkedReferences = () => {
    if (block.parentId || !showUnlinkedRefs) {
      return
    }
    const titlePat = new RegExp(`(?<![\\[\\w])${block.text}(?![\\[\\w]+)`, 'gi')
    const references = Object.values(blocks)
      .filter(referenceBlock => referenceBlock.parentId && titlePat.test(referenceBlock.text))
      .map(referenceBlock => {
        const referenceBlockPage = getPage(referenceBlock, blocks)
        return (
          <div key={referenceBlock.id}>
            <PageLink blockId={referenceBlockPage.id}>
              <h5>{referenceBlockPage.text}</h5>
            </PageLink>
            <div className="reference-container">
              <Editor
                blockId={referenceBlock.id}
                isRoot={false}
                isMain={isMain}
                fold
                showBreadcrumbs
              />
            </div>
          </div>
        )
      })
    if (!references.length) {
      return <span>No unlinked references</span>
    }
    return references
  }

  return (
    <div>
      {block.parentId === null && (references && references.length > 0) && isMain &&
        <div className="references references--linked">
          <b>{references.length} Linked References</b>
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