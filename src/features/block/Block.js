import React, { useState, useRef } from 'react'
import { compiler } from 'markdown-to-jsx'
import reactStringReplace from "react-string-replace";
import { useDispatch, useSelector } from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize'
import getCaretCoordinates from 'textarea-caret'

import './block.scss'

import { addBlock, removeBlock, updateBlock, repositionBlock, BlockModel, makeSibling } from './blockSlice'
import { setLinks } from '../links/linksSlice'
import PageLink from '../links/PageLink'
import { updateFocusedBlock } from '../editor/editorSlice'
import Search from '../search/Search'

const Block = ({ block, isMain, isTitle }) => {
  const dispatch = useDispatch()
  const textarea = useRef(null)
  const blocks = useSelector(state => state.blocks)
  const linksFrom = useSelector(state => state.links.from)
  const focusedBlock = useSelector(state => state.editor.focusedBlock)
  const [editing, setEditing] = useState(focusedBlock.isMain === isMain && focusedBlock.blockId === block.id)
  const [searching, setSearching] = useState(false)
  const [query, setQuery] = useState(false)
  const [cursorCaret, setCursorCaret] = useState({ offsetX: null, offsetY: null, width: null })

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

  const titleCharAllowed = keyCode => (
    // Numbers and letters
    (48 <= keyCode && keyCode < 91)
    // Numpad numbers and symbols
    || (96 <= keyCode && keyCode < 112 && keyCode !== 108)
    // Symbols
    || (186 <= keyCode)
  )

  const getPage = _block => {
    if (!_block.parentId) {
      return _block
    }
    const parentBlock = blocks[_block.parentId]
    return getPage(parentBlock)
  }

  const getPrevSibling = _block => {
    const parentBlock = blocks[_block.parentId]
    const blockIndex = parentBlock.childrenIds.indexOf(_block.id)
    if (blockIndex < 1) {
      return null
    }
    const prevSiblingBlock = blocks[parentBlock.childrenIds[blockIndex - 1]]
    return prevSiblingBlock
  }

  const getLastChildLeaf = _block => {
    if (!_block.childrenIds.length) {
      return _block
    }
    const lastChildBlock = blocks[_block.childrenIds.slice(-1)]
    return getLastChildLeaf(lastChildBlock)
  }

  const getNextBlockUp = _block => {
    const prevSibling = getPrevSibling(_block)
    if (prevSibling) {
      if (prevSibling.childrenIds.length) {
        return getLastChildLeaf(prevSibling)
      } else {
        return prevSibling
      }
    } else {
      const parentBlock = blocks[_block.parentId]
      return parentBlock
    }
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
      let newBlockText = ''
      if (event.target.selectionStart !== event.target.value.length) {
        // In-text Enter, cut
        const start = event.target.selectionStart
        newBlockText = block.text.substring(start)
        const remainingText = block.text.substring(0, start)
        dispatch(updateBlock({ blockId: block.id, text: remainingText }))
        event.target.value = remainingText
      }
      const newBlock = BlockModel({ text: newBlockText, parentId: block.parentId })
      dispatch(addBlock(newBlock))
      dispatch(makeSibling({ firstSiblingBlockId: block.id, secondSiblingBlockId: newBlock.id }))
      dispatch(updateFocusedBlock({ blockId: newBlock.id, isMain, caretPos: 0 }))
    } else if (event.key === '[') {
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
    } else if (event.key === 'Backspace') {
      if (textarea.current.selectionStart !== 0) {
        return
      }
      if (block.childrenIds.length) {
        return
      }
      const pageBlock = getPage(block)
      const isFirstPageChild = block.parentId === pageBlock.id && pageBlock.childrenIds[0] === block.id
      if (isFirstPageChild) {
        return
      }
      const destinationBlock = getNextBlockUp(block)
      const newCaretPos = destinationBlock.text.length
      dispatch(updateBlock({ blockId: destinationBlock.id, text: destinationBlock.text + block.text }))
      dispatch(removeBlock({ blockId: block.id }))
      dispatch(updateFocusedBlock({ blockId: destinationBlock.id, isMain, caretPos: newCaretPos }))
      event.preventDefault()
    } else if (searching && titleCharAllowed(event.keyCode)) {
      setQuery(query + event.key)
    }
  }

  const insertPageTitleAtCursor = (blockToInsert, event) => {
    event.preventDefault()
    const title = blockToInsert.text
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
    dispatch(updateBlock({ blockId: block.id, text: newValue }))
  }

  const edit = event => {
    const clickPosX = event.clientX
    const clickPosY = event.clientY
    const blockX = event.currentTarget.offsetLeft
    const blockY = event.currentTarget.offsetTop
    const offsetX = clickPosX - blockX
    const offsetY = clickPosY - blockY
    const width = event.currentTarget.offsetWidth
    setCursorCaret({ offsetX, offsetY, width })
    setEditing(true)
  }

  const translateCaretPos = (_textarea) => {
    if (!_textarea) {
      return
    }

    const symbolsToSkip = ['*', '_']
    const originalText = _textarea.value

    let minDistance = 10000
    let translatedCaretPos = 0
    let skippedSymbolIndexes = []
    for (let caretPos = 0; caretPos <= _textarea.value.length; caretPos++) {
      const currentChar = _textarea.value.charAt(caretPos)
      if (symbolsToSkip.includes(currentChar)) {
        const chars = _textarea.value.split('')
        chars.splice(caretPos, 1)
        _textarea.value = chars.join('')
        skippedSymbolIndexes.push(caretPos)
        caretPos--
      }
      const coordinates = getCaretCoordinates(_textarea, caretPos)
      const x = coordinates.left
      const y = coordinates.top
      const distance = Math.sqrt(Math.pow((x - cursorCaret.offsetX), 2) + Math.pow((y - cursorCaret.offsetY), 2))
      if (distance < minDistance) {
        minDistance = distance
        translatedCaretPos = caretPos
      }
    }

    _textarea.value = originalText
    let newCaretPos = translatedCaretPos
    if (skippedSymbolIndexes.length && skippedSymbolIndexes[0] <= newCaretPos) {
      newCaretPos += skippedSymbolIndexes.filter(index => index <= translatedCaretPos).length
    }
    _textarea.selectionStart = newCaretPos
    _textarea.selectionEnd = newCaretPos

    setCursorCaret({ offsetX: null, offsetY: null, width: null })
  }

  const save = event => {
    if (!searching && block.text !== event.target.value) {
      dispatch(updateBlock({ blockId: block.id, text: event.target.value }))
    }
  }

  const isFocusedBlock = focusedBlock.blockId
    && focusedBlock.blockId === block.id
    && focusedBlock.isMain === isMain
    && focusedBlock.caretPos

  const setCaretPos = event => {
    if (isFocusedBlock) {
      event.target.selectionStart = focusedBlock.caretPos
    } else if (cursorCaret.offsetX !== null) {
      translateCaretPos(event.target)
    }
  }

  if (isFocusedBlock) {
    if (!editing && !textarea.current) {
      setEditing(true)
    }
    if (editing && textarea.current) {
      textarea.current.focus()
      textarea.current.selectionStart = focusedBlock.caretPos
    }
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
      {editing
        ?
          <div className="block__autocomplete-container">
            <TextareaAutosize
              ref={textarea}
              className={className}
              autoFocus
              onFocus={setCaretPos}
              onKeyDown={onKeyDown}
              onChange={save}
              onBlur={() => setEditing(false)}
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