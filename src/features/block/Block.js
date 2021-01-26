import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './block.scss'

import { updateBlock } from './blockSlice'

const Block = ({ block }) => {
  const dispatch = useDispatch()
  const [editing, setEditing] = useState(false)

  const plaintext = () => {
    return block.text
  }

  const rendered = () => {
    const text = plaintext()
    const textWithLinks = renderLinks(text)
    const textWithItalics = renderItalics(textWithLinks)
    const textWithBold = renderBold(textWithItalics)
    const html = textWithBold
    return html
  }

  const renderLinks = text => {
    const pat = /\[\[([^[\]]*)\]\]/g;
    return text.replace(pat, function(match, textInsideBrackets) {
      const block = this.props.getOrCreate(textInsideBrackets)
      return <Link to={`/page/${block.id}`}>{block.text}</Link>
    })
  }

  const renderItalics = (text) => {
    const pat = /_([^_]*)_/g;
    return text.replace(pat, function(match, italicText) {
      return <i>{italicText}</i>
    })
  }

  const renderBold = (text) => {
    const pat = /\*\*([^*]*)\*\*/g;
    return text.replace(pat, function(match, boldText) {
      return <b>{boldText}</b>
    })
  }

  if (editing) {
    return (
      <textarea
        className="block block--edit text-light"
        autoFocus
        onBlur={() => setEditing(false)}
        blockId={block.id}
        defaultValue={plaintext()}
        onChange={(event) => dispatch(updateBlock({ blockId: block.id, text: event.target.value }))}
      />
    )
  }
  return (
    <span
      className="block block--rendered"
      onClick={() => setEditing(true)}
    >
      {rendered()}
    </span>
  )
}

export default Block