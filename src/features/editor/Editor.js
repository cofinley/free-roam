import React from 'react'
import { useSelector } from 'react-redux';

import './editor.scss'

import References from './References'
import Block from '../block/Block'

const Editor = ({ blockId, isRoot, isMain }) => {
  const blocks = useSelector(state => state.blocks)
  const block = blocks[blockId]

  if (!block) {
    return <h1 className="text-light">Page not found</h1>
  }

  const children = block.childrenIds.map(childBlockId => (
    <Editor
      key={childBlockId}
      isRoot={false}
      isMain={isMain}
      blockId={childBlockId}
    />
  ))

  return (
    <div className={`editor ${isRoot ? 'editor--root' : 'editor--child'}`}>
      <Block
        block={block}
        isTitle={isRoot}
      />
      {children.length > 0 &&
        <div className="editor__children">
          {children}
        </div>
      }
      {isRoot &&
        <References block={block} isMain={isMain} />
      }
    </div>
  )
}

export default Editor