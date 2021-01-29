import React, { useState } from 'react'
import { compiler } from 'markdown-to-jsx'
import reactStringReplace from "react-string-replace";
import { useDispatch, useSelector } from 'react-redux'

import './block.scss'

import { addBlock, updateBlock, BlockModel } from './blockSlice'
import { setLinks } from '../links/linksSlice'
import PageLink from '../links/PageLink'

const Block = ({ block, isTitle }) => {
  const dispatch = useDispatch()
  const blocks = useSelector(state => state.blocks)
  const [editing, setEditing] = useState(false)

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
        return compiler(element, { forceInline: true })
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
        <PageLink key={i + match} pageBlockId={pageBlock.id}>{pageBlock.text}</PageLink>
      )
    })
    dispatch(setLinks({ sourceBlockId: block.id, linkedBlockIds: Array.from(links)}))
    return jsxArray
  }

  const save = event => {
    setEditing(false)
    dispatch(updateBlock({ blockId: block.id, text: event.target.value }))
  }

  const classes = ['block']
  if (editing) {
    classes.push('block--edit')
  }
  if (isTitle) {
    classes.push('block--title')
  }
  const className = classes.join(' ')

  if (editing) {
    return (
      <textarea
        className={className}
        autoFocus
        onBlur={save}
        blockId={block.id}
        defaultValue={block.text}
      />
    )
  }
  return (
    <span
      className={className}
      onClick={() => setEditing(true)}
    >
      {rendered()}
    </span>
  )
}

export default Block