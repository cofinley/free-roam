import React from 'react'
import { useSelector } from 'react-redux';

import Block from '../block/Block'

import './editor.scss'

const Editor = ({ blockId, isRoot }) => {
  const blocks = useSelector(state => state.blocks)
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
    </div>
  )
}

export default Editor