import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

import './editor.scss'

import References from './References'
import Block from '../block/Block'
import Breadcrumbs from './Breadcrumbs'
import BlockActions from '../block-actions/BlockActions';

const Editor = ({ blockId, isRoot, showBreadcrumbs = false, isMain, fold = false }) => {
  const block = useSelector(state => state.blocks[blockId])
  const [foldBlock, setFoldBlock] = useState(fold)
  const [foldNextLevel, setFoldNextLevel] = useState(false)

  // Make sure fold prop informs the foldBlock hook state on update
  useEffect(() => {
    setFoldBlock(fold);
   }, [fold])

  if (!block) {
    return <h1 className="text-light">Page not found</h1>
  }

  const isPage = block.parentId === null
  const isTitle = isPage && isRoot

  const children = block.childrenIds.map(childBlockId => (
    <Editor
      key={childBlockId}
      isRoot={false}
      isMain={isMain}
      blockId={childBlockId}
      fold={foldNextLevel}
    />
  ))

  return (
    <div className={`editor ${isRoot ? 'editor--root' : 'editor--child'}${isPage ? ' editor--page' : ''}`}>
      {(showBreadcrumbs || (isRoot && !isPage)) &&
        <Breadcrumbs block={block} />
      }
      <div className="d-flex">
        {!isTitle &&
          <BlockActions
            block={block}
            foldBlock={foldBlock}
            setFoldBlock={setFoldBlock}
            hasChildren={children.length > 0}
          />
        }
        <Block
          block={block}
          isTitle={isTitle}
          isMain={isMain}
        />
      </div>
      {!foldBlock && children.length > 0 &&
        <div className="editor__children">
          {block.parentId !== null &&
            <div
              className="editor__children__thread-line"
              onClick={() => setFoldNextLevel(!foldNextLevel)}
            />
          }
          <div className="editor__children__container">
            {children}
          </div>
        </div>
      }
      {isRoot &&
        <References
          block={block}
          isMain={isMain}
          key={block.id}
        />
      }
    </div>
  )
}

export default Editor