import React, { useState } from 'react'
import { compiler } from 'markdown-to-jsx'
import reactStringReplace from "react-string-replace";
import { useDispatch, useSelector } from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize'

import './block.scss'

import { addBlock, updateBlock, repositionBlock, BlockModel, makeSibling } from './blockSlice'
import BlockActions from './BlockActions'
import { setLinks } from '../links/linksSlice'
import PageLink from '../links/PageLink'
import { updateFocusedBlock } from '../editor/editorSlice'

const Block = ({ block, isMain, isTitle, foldBlock, setFoldBlock }) => {
  const dispatch = useDispatch()
  const blocks = useSelector(state => state.blocks)
  const focusedBlock = useSelector(state => state.editor.focusedBlock)
  const [editing, setEditing] = useState(focusedBlock.isMain === isMain && focusedBlock.blockId === block.id)

  const linkToPage = text => {
    const foundPage = Object.values(blocks)
      .filter(block => !block.parentId)
      .find(block => block.text === text)
    if (foundPage) {
      return foundPage
    }
    const newPageBlock = BlockModel({ text })
    dispatch(addBlock(newPageBlock))
    return newPageBlock
  }

  const rendered = () => {
    const plaintext = block.text
    const linkedPlaintext = renderLinks(plaintext)
    const jsxMdArray = linkedPlaintext
      .map(element => {
      if (typeof element === 'string') {
        const jsx = compiler(element)
        const keyedJsx = React.cloneElement(jsx, { key: element })
        return keyedJsx
      }
      return element
    })
    return jsxMdArray
  }

  const renderLinks = text => {
    const pat = /\[\[([^[\]]*)\]\]/g
    const links = new Set()
    const jsxArray = reactStringReplace(text, pat, (match, i) => {
      const pageBlock = linkToPage(match)
      links.add(pageBlock.id)
      return (
        <PageLink
          key={`${match}-${i}`}
          pageBlockId={pageBlock.id}
        >
          {pageBlock.text}
        </PageLink>
      )
    })
    dispatch(setLinks({ sourceBlockId: block.id, linkedBlockIds: Array.from(links)}))
    return jsxArray
  }

  const edit = event => {
    setEditing(true)
  }

  const onKeyDown = event => {
    if (event.key === 'Tab') {
      event.preventDefault()
      if (event.shiftKey) {
        dispatch(repositionBlock({ blockId: block.id, direction: 'backward' }))
      } else {
        dispatch(repositionBlock({ blockId: block.id, direction: 'forward' }))
      }
      dispatch(updateFocusedBlock({ blockId: block.id, isMain, caretPos: event.target.selectionStart }))
    } else if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      const start = event.target.selectionStart
      const textToCut = block.text.substring(start)
      const newBlock = BlockModel({ text: textToCut, parentId: block.parentId })
      dispatch(addBlock(newBlock))
      dispatch(makeSibling({ firstSiblingBlockId: block.id, secondSiblingBlockId: newBlock.id }))
      dispatch(updateFocusedBlock({ blockId: newBlock.id, isMain, caretPos: 0 }))

      const remainingText = block.text.substring(0, start)
      dispatch(updateBlock({ blockId: block.id, text: remainingText }))
      event.target.value = remainingText
    }
  }

  const save = event => {
    setEditing(false)
    if (block.text !== event.target.value) {
      dispatch(updateBlock({ blockId: block.id, text: event.target.value }))
    }
  }

  const setCaretPos = event => {
    event.target.selectionStart = focusedBlock.caretPos
  }

  const classes = ['block-text']
  if (editing) {
    classes.push('block-text--edit')
  }
  if (isTitle) {
    classes.push('block-text--title')
  }
  const className = classes.join(' ')

  return (
      <div className="block">
      {!isTitle &&
        <BlockActions
          block={block}
          foldBlock={foldBlock}
          setFoldBlock={setFoldBlock}
        />
      }
      {editing
        ?
          <TextareaAutosize
            className={className}
            autoFocus
            onFocus={setCaretPos}
            onKeyDown={onKeyDown}
            onBlur={save}
            defaultValue={block.text}
          />
        :
        <span
          className={className}
          onClick={edit}
        >
          {rendered()}
        </span>
      }
    </div>
  )
}

export default Block