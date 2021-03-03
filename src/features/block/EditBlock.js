import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextareaAutosize from 'react-textarea-autosize'
import getCaretCoordinates from 'textarea-caret'

import { getCaretInfo } from './editUtils'
import { BlockModel, getPage, getNextBlockUp } from './blockModel'
import { addBlock, removeBlock, updateBlock, repositionBlock, makeSibling } from './blockSlice'
import { updateFocusedBlock } from '../editor/editorSlice'
import Search from '../search/Search'

const EditBlock = ({ block, isMain, isTitle, cursorCaret, setCursorCaret, onRender }) => {
  const dispatch = useDispatch()
  const textarea = useRef(null)

  const [searching, setSearching] = useState(false)
  const focusedBlock = useSelector(state => state.editor.focusedBlock)
  const blocks = useSelector(state => state.blocks)
  const [query, setQuery] = useState(false)

  const onKeyDown = event => {
    if (event.key === 'Tab') {
      onTab(event)
    } else if (event.key === 'Enter' && !event.shiftKey) {
      onEnter(event)
    } else if (event.key === '[') {
      onOpenBracket(event)
    } else if (event.key === 'Backspace') {
      onBackspace(event)
    }
  }

  const onKeyUp = event => {
    const caretPos = event.target.selectionStart
    const caretInfo = getCaretInfo(event.target.value, caretPos)
    if (caretInfo.caretInBrackets) {
      setSearching(true)
      setQuery(caretInfo.textInBrackets)
    } else {
      setSearching(false)
    }
  }

  const onTab = event => {
    event.preventDefault()
    if (event.shiftKey) {
      dispatch(repositionBlock({ blockId: block.id, direction: 'backward' }))
    } else {
      dispatch(repositionBlock({ blockId: block.id, direction: 'forward' }))
    }
    dispatch(updateFocusedBlock({ blockId: block.id, isMain, caretPos: event.target.selectionStart }))
  }

  const onEnter = event => {
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
    const newBlock = BlockModel({ text: newBlockText, parentId: block.parentId }, blocks)
    dispatch(addBlock(newBlock))
    dispatch(makeSibling({ firstSiblingBlockId: block.id, secondSiblingBlockId: newBlock.id }))
    dispatch(updateFocusedBlock({ blockId: newBlock.id, isMain, caretPos: 0 }))
  }

  const onOpenBracket = event => {
    event.preventDefault()
    const caretPos = event.target.selectionStart
    const value = event.target.value
    const prevChar = value.charAt(caretPos - 1)
    event.target.value = value.substring(0, caretPos) + '[]' + value.substring(caretPos, value.length)
    event.target.selectionStart = caretPos + 1
    event.target.selectionEnd = caretPos + 1
    if (prevChar === '[' && !searching) {
      setSearching(true)
      setQuery('')
      return
    } else {
      setSearching(false)
    }
  }

  const onBackspace = event => {
    if (textarea.current.selectionStart !== 0) {
      return
    }
    if (block.childrenIds.length) {
      return
    }
    event.preventDefault()
    const pageBlock = getPage(block, blocks)
    const isFirstPageChild = block.parentId === pageBlock.id && pageBlock.childrenIds[0] === block.id
    if (isFirstPageChild) {
      return
    }
    const destinationBlock = getNextBlockUp(block, blocks)
    const newCaretPos = destinationBlock.text.length
    dispatch(updateBlock({ blockId: destinationBlock.id, text: destinationBlock.text + block.text }))
    dispatch(removeBlock({ blockId: block.id }))
    dispatch(updateFocusedBlock({ blockId: destinationBlock.id, isMain, caretPos: newCaretPos }))
  }

  const insertPageTitleAtCursor = (blockToInsert, event) => {
    event.preventDefault()
    const title = blockToInsert.text
    const value = textarea.current.value
    const caretPos = textarea.current.selectionStart
    const caretInfo = getCaretInfo(value, caretPos)
    const beforeTitle = value.substring(0, caretInfo.startBracketIndex + 2)
    const afterTitle = value.substring(caretInfo.endBracketIndex)
    const newValue = beforeTitle + title + afterTitle
    textarea.current.value = newValue
    setSearching(false)
    setQuery(null)
    dispatch(updateBlock({ blockId: block.id, text: newValue }))
  }

  const translateCursorToCaretPos = (_textarea) => {
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
      const { left: x, top: y } = getCaretCoordinates(_textarea, caretPos)
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

  const setCaretPos = event => {
    if (isFocusedBlock) {
      event.target.selectionStart = focusedBlock.caretPos
    } else if (cursorCaret.offsetX !== null) {
      translateCursorToCaretPos(event.target)
    }
  }

  const save = event => {
    if (!searching && block.text !== event.target.value) {
      dispatch(updateBlock({ blockId: block.id, text: event.target.value }))
    }
  }

  const forceSave = text => {
    if (block.text !== text) {
      dispatch(updateBlock({ blockId: block.id, text }))
    }
  }

  const isFocusedBlock = focusedBlock.blockId
    && focusedBlock.blockId === block.id
    && focusedBlock.isMain === isMain
    && focusedBlock.caretPos

  if (isFocusedBlock && textarea.current) {
    textarea.current.focus()
    textarea.current.selectionStart = focusedBlock.caretPos
  }

  const onBlur = event => {
    forceSave(event.target.value)
    onRender()
  }

  return (
    <div className="block__autocomplete-container">
      <TextareaAutosize
        ref={textarea}
        className={`block-text block-text--edit${isTitle ? ' block-text--title': ''}`}
        autoFocus
        onFocus={setCaretPos}
        onKeyDown={onKeyDown}
        onChange={save}
        onKeyUp={onKeyUp}
        onBlur={onBlur}
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
  )
}

export default EditBlock