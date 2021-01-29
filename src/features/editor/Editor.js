import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import Block from '../block/Block'

import './editor.scss'

import PageLink from '../links/PageLink'

const Editor = ({ blockId, isRoot, isMain }) => {
  const [showUnlinkedRefs, setShowUnlinkedRefs] = useState(false)
  const blocks = useSelector(state => state.blocks)
  const links = useSelector(state => state.links)
  const references = links[blockId]
  const block = blocks[blockId]

  if (!block) {
    return <h1 className="text-light">Page not found</h1>
  }

  const children = block.childrenIds.map(childBlockId => {
    return (
      <Editor
        key={`editor-${childBlockId}`}
        isRoot={false}
        blockId={childBlockId}
      />
    )
  })

  const linkedReferences = () => {
    if (block.parentId || !references || !references.length) {
      return
    }
    return references.map(referenceBlockId => {
      const referenceBlock = blocks[referenceBlockId]
      return (
        <div>
          <PageLink pageBlockId={referenceBlockId}><h5>{referenceBlock.text}</h5></PageLink>
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
          <PageLink pageBlockId={otherBlock.id}><h5>{otherBlock.text}</h5></PageLink>
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
    <div className={`editor ${isRoot ? 'editor--root' : ''}`}>
      {isRoot &&
        <Block block={block} isTitle={true} />
      }
      {!isRoot &&
        <Block block={block} />
      }
      {children.length > 0 &&
        <div className="ml-2">
          {children}
        </div>
      }
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

export default Editor