import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { getPage } from '../block/blockModel';
import { CaretRightFill, CaretDownFill } from 'react-bootstrap-icons'

import PageLink from '../links/PageLink'
import Editor from './Editor'

const References = ({ block, isMain }) => {
  const [showLinkedRefs, setShowLinkedRefs] = useState(true)
  const [showUnlinkedRefs, setShowUnlinkedRefs] = useState(false)
  const [unlinkedRefs, setUnlinkedRefs] = useState(null)
  const references = useSelector(state => state.links.to[block.id])
  const blocks = useSelector(state => state.blocks)

  const renderLinkedReferences = () => {
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
              isMain={isMain}
              fold
              showBreadcrumbs
            />
          </div>
        </div>
      )
    })
  }

  const getUnlinkedReferences = text => {
    const titlePat = new RegExp(`(?<![\\[\\w])${text}(?![\\[\\w]+)`, 'gi')
    const unlinkedReferenceBlocks = Object.values(blocks)
      .filter(referenceBlock => referenceBlock.parentId && titlePat.test(referenceBlock.text))
    return unlinkedReferenceBlocks
  }

  const renderUnlinkedReferences = () => {
    if (block.parentId || !showUnlinkedRefs) {
      return
    }
    if (!unlinkedRefs.length) {
      return <p>No unlinked references</p>
    }
    const unlinkedReferenceBlockEditors = unlinkedRefs
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
    return unlinkedReferenceBlockEditors
  }

  const toggleUnlinkedReferences = event => {
    if (showUnlinkedRefs) {
      setShowUnlinkedRefs(false)
    } else {
      setShowUnlinkedRefs(true)
      setUnlinkedRefs(getUnlinkedReferences(block.text))
    }
  }

  return (
    <div>
      {block.parentId === null && references && references.length > 0 && isMain &&
        <div className="references references--linked">
          <span className="references__toggle no-select" onClick={() => setShowLinkedRefs(state => !state)}>
            {showLinkedRefs
              ? <CaretDownFill color="white" size={12} />
              : <CaretRightFill color="white" size={12} />
            }
            <b>{references.length} Linked References</b>
          </span>
          {showLinkedRefs &&
            renderLinkedReferences()
          }
        </div>
      }
      {block.parentId === null && isMain &&
        <div className="references references--unlinked">
          <span className="references__toggle no-select" onClick={toggleUnlinkedReferences}>
            {showUnlinkedRefs
              ? <CaretDownFill color="white" size={12} />
              : <CaretRightFill color="white" size={12} />
            }
            <b>{unlinkedRefs && unlinkedRefs.length ? unlinkedRefs.length : ''} Unlinked References</b>
          </span>
          {showUnlinkedRefs &&
            renderUnlinkedReferences()
          }
        </div>
      }
    </div>
  )
}

export default References