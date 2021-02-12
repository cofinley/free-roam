import React from 'react'
import { useSelector } from 'react-redux';

//import "./style.scss"

import PageLink from '../links/PageLink'

const Breadcrumbs = ({ block }) => {
  const blocks = useSelector(state => state.blocks)

  const breadcrumbs = (parentBlockId, list = []) => {
    if (!parentBlockId) {
      return list.reverse()
    }
    const parentBlock = blocks[parentBlockId]
    const crumb = <PageLink pageBlockId={parentBlockId} key={parentBlockId} noStyling>{parentBlock.text}</PageLink>
    return breadcrumbs(parentBlock.parentId, list.concat(crumb))
  }

  return (
    <div className="breadcrumbs text-muted">
      {breadcrumbs(block.parentId)}
    </div>
  )
}

export default Breadcrumbs