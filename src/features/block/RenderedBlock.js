import React from 'react';
import { compiler } from 'markdown-to-jsx'
import reactStringReplace from "react-string-replace";
import { useDispatch, useSelector } from 'react-redux'

import { addBlock } from './blockSlice'
import { BlockModel } from './blockModel'
import PageLink from '../links/PageLink'
import { setLinks } from '../links/linksSlice'

const RenderedBlock = React.memo(({ block, isTitle, onEdit }) => {
  const dispatch = useDispatch()
  const blocks = useSelector(state => state.blocks)
  const linksFromBlock = useSelector(state => state.links.from[block.id])

  const rendered = () => {
    const linkedPlaintext = renderLinks(block.text)
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
      // Support optional link aliases (e.g. [[short link name|my-long-link-which-i-dont-want-to-display]])
      const linkParts = match.split('|')
      let pageTitle, linkText
      if (linkParts.length === 2) {
        linkText = linkParts[0].trim()
        pageTitle = linkParts[1].trim()
      } else if (linkParts.length === 1) {
        pageTitle = linkParts[0].trim()
      }
      const pageBlock = linkToPage(pageTitle)
      linkText = linkText || pageBlock.text
      links.add(pageBlock.id)
      return (
        <PageLink
          key={`${pageTitle}-${i}`}
          blockId={pageBlock.id}
        >
          {linkText}
        </PageLink>
      )
    })
    const linksArray = Array.from(links)
    if (linksArray.length) {
      if (linksFromBlock === undefined || !eqSet(new Set(linksArray), new Set(linksFromBlock))) {
        dispatch(setLinks({ sourceBlockId: block.id, linkedBlockIds: linksArray }))
      }
    }
    return jsxArray
  }

  const eqSet = (as, bs) => {
    if (as.size !== bs.size) return false;
    for (var a of as) if (!bs.has(a)) return false;
    return true;
  }

  const linkToPage = text => {
    const foundPage = Object.values(blocks)
      .find(block => !block.parentId && block.text === text)
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
      {rendered(block.text)}
    </span>
  )
})

export default RenderedBlock