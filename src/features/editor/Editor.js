import React from 'react'
import { useSelector } from 'react-redux';

import Block from '../block/Block'

import './editor.scss'

import PageLink from '../links/PageLink'

const Editor = ({ blockId, isRoot }) => {
  const blocks = useSelector(state => state.blocks)
  const links = useSelector(state => state.links)
  const references = links[blockId]
  const block = blocks[blockId]

  const blockLoaded = block !== undefined
  if (!blockLoaded) {
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

  return (
    <div className={`editor ${isRoot ? 'editor--root' : ''}`}>
      {isRoot &&
        <h1 className="block block--title">{block.text}</h1>
      }
      {!isRoot &&
        <Block block={block} />
      }
      {children.length > 0 &&
        <div className="ml-2">
          {children}
        </div>
      }
      {block.parentId === null && (references && references.length > 0) &&
        <div className="linked-references">
          <b>Linked References</b>
          {linkedReferences()}
        </div>
      }
    </div>
  )
}

export default Editor