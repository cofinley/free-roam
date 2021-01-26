import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { compiler } from 'markdown-to-jsx'
import reactStringReplace from "react-string-replace";
import { useDispatch, useSelector } from 'react-redux'

import './block.scss'

import { addBlock, updateBlock } from './blockSlice'

const Block = ({ block }) => {
  const dispatch = useDispatch()
  const blocks = useSelector(state => state.blocks)

  const [editing, setEditing] = useState(false)

  const getOrCreateBlockFromText = text => {
    const block = Object.values(blocks).find(block => block.text === text)
    if (block) {
      return block
    }
    const newBlock = dispatch(addBlock({ text }))
    return newBlock
  }

  const rendered = () => {
    const plaintext = block.text
    const linkedPlaintext = renderLinks(plaintext)
    const jsxMdArray = linkedPlaintext
      .map(element => {
      if (typeof element === 'string') {
        return compiler(element, { forceInline: true })
      }
      return element
    })
    return jsxMdArray
  }

  const renderLinks = text => {
    const pat = /\[\[([^[\]]*)\]\]/g
    return reactStringReplace(text, pat, (match, i) => {
      const block = getOrCreateBlockFromText(match)
      return (
        <Link key={i + match} to={`/page/${block.id}`}>{block.text}</Link>
      )
    })
  }

  if (editing) {
    return (
      <textarea
        className="block block--edit text-light"
        autoFocus
        onBlur={() => setEditing(false)}
        blockId={block.id}
        defaultValue={block.text}
        onChange={(event) => dispatch(updateBlock({ blockId: block.id, text: event.target.value }))}
      />
    )
  }
  return (
    <span
      onClick={() => setEditing(true)}
    >
      {rendered()}
    </span>
  )
}

export default Block