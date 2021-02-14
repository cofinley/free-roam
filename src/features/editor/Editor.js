import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import './editor.scss'

import References from './References'
import Block from '../block/Block'
import Breadcrumbs from './Breadcrumbs'

const Editor = ({ blockId, isRoot, isMain, stopRecursion = false }) => {
  const blocks = useSelector(state => state.blocks)
  const block = blocks[blockId]
  const [foldBlock, setFoldBlock] = useState(false)
  const [foldNextLevel, setFoldNextLevel] = useState(false)

  if (!block) {
    return <h1 className="text-light">Page not found</h1>
  }

  const isPage = block.parentId === null

  const children = block.childrenIds.map(childBlockId => (
    <Editor
      key={childBlockId}
      isRoot={false}
      isMain={isMain}
      blockId={childBlockId}
      stopRecursion={foldNextLevel}
    />
  ))

  return (
    <div className={`editor ${isRoot ? 'editor--root' : 'editor--child'}${isPage ? ' editor--page' : ''}`}>
      {isRoot && !isPage &&
        <Breadcrumbs block={block} />
      }
      <Block
        block={block}
        isTitle={isRoot && isPage}
        foldBlock={foldBlock}
        isMain={isMain}
        setFoldBlock={setFoldBlock}
      />
      {!stopRecursion && !foldBlock && children.length > 0 &&
        <div className="editor__children">
          {block.parentId !== null &&
            <div className="editor__children__thread-line" onClick={() => setFoldNextLevel(!foldNextLevel)}/>
          }
          <div className="editor__children__container">
            {children}
          </div>
        </div>
      }
      {isRoot &&
        <References block={block} isMain={isMain} key={block.id} />
      }
    </div>
  )
}

export default Editor