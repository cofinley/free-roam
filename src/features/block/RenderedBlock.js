import React from 'react';
import { compiler } from 'markdown-to-jsx'
import reactStringReplace from "react-string-replace";
import { useDispatch, useSelector } from 'react-redux'

import { addBlock } from './blockSlice'
import { BlockModel } from './blockModel'
import PageLink from '../links/PageLink'
import { setLinks } from '../links/linksSlice'

const RenderedBlock = ({ block, isTitle, onEdit }) => {
  const dispatch = useDispatch()
  const blocks = useSelector(state => state.blocks)
  const linksFrom = useSelector(state => state.links.from)

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
          blockId={pageBlock.id}
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

  const linkToPage = text => {
    const foundPage = Object.values(blocks)
      .filter(block => !block.parentId)
      .find(block => block.text === text)
    if (foundPage) {
      return foundPage
    }
    const newPageBlock = BlockModel({ text }, blocks)
    dispatch(addBlock(newPageBlock))
    return newPageBlock
  }

  return (
    <span
      className={`block-text${isTitle ? ' block-text--title': ''}`}
      onClick={onEdit}
    >
      {rendered()}
    </span>
  )
}

export default RenderedBlock