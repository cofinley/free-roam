import React, { useState, useRef } from 'react'
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
import Search from '../search/Search';

const Block = ({ block, isMain, isTitle, foldBlock, setFoldBlock }) => {
  const dispatch = useDispatch()
  const textarea = useRef(null)
  const blocks = useSelector(state => state.blocks)
  const linksFrom = useSelector(state => state.links.from)
  const focusedBlock = useSelector(state => state.editor.focusedBlock)
  const [editing, setEditing] = useState(focusedBlock.isMain === isMain && focusedBlock.blockId === block.id)
  const [searching, setSearching] = useState(false)
  const [query, setQuery] = useState(false)

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
    const linksArray = Array.from(links)
    const blockInFromLinks = block.id in linksFrom
    if (linksArray.length) {
      if (!(blockInFromLinks) || JSON.stringify(linksArray.sort()) !== JSON.stringify(linksFrom[block.id].sort())) {
        dispatch(setLinks({ sourceBlockId: block.id, linkedBlockIds: linksArray }))
      }
    }
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
    } else {
      if (event.key === '[') {
        const caretPos = event.target.selectionStart
        const value = event.target.value
        const prevChar = value.charAt(caretPos - 1)
        event.target.value = value.substring(0, caretPos) + '[]' + value.substring(caretPos, value.length)
        event.preventDefault()
        event.target.selectionStart = caretPos + 1
        event.target.selectionEnd = caretPos + 1
        if (prevChar === '[' && !searching) {
          setSearching(true)
          setQuery('')
        } else {
          setSearching(false)
        }
      } else {
        const titleCharAllowed = keyCode => (
          // Numbers and letters
          (48 <= keyCode && keyCode < 91)
          // Numpad numbers and symbols
          || (96 <= keyCode && keyCode < 112 && keyCode !== 108)
          // Symbols
          || (186 <= keyCode)
        )
        if (searching && titleCharAllowed(event.keyCode)) {
          setQuery(query + event.key)
        }
      }
    }
  }

  const insertPageTitleAtCursor = block => {
    const title = block.text
    const value = textarea.current.value
    const caretPos = textarea.current.selectionStart
    const firstBracketPat = /\[\[(?!.*\]\])/gm
    const lastBracketPat = /(?<!\[\[[^\]]+)]]/gm
    const firstSurroundingBracketIndex = value.substring(0, caretPos).search(firstBracketPat)
    const lastSurroundingBracketIndex = Array.from(value.substring(caretPos).matchAll(lastBracketPat)).slice(-1)[0].index + caretPos
    const beforeTitle = value.substring(0, firstSurroundingBracketIndex + 2)
    const afterTitle = value.substring(lastSurroundingBracketIndex)
    const newValue = beforeTitle + title + afterTitle
    textarea.current.value = newValue
    setSearching(false)
    setQuery(null)
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
          <div className="block__autocomplete-container">
            <TextareaAutosize
              ref={textarea}
              className={className}
              autoFocus
              onFocus={setCaretPos}
              onKeyDown={onKeyDown}
              onBlur={save}
              defaultValue={block.text}
            />
            {searching &&
              <Search
                query={query}
                onlyPages
                useLinks={false}
                onResultClick={insertPageTitleAtCursor}
              />
            }
          </div>
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