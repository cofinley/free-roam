import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import './link.scss'

import { pushView } from '../view-pane/viewPaneSlice'

const PageLink = ({ blockId, isPage = true, children, noStyling, afterClick, ...rest }) => {
  const dispatch = useDispatch()
  const to = `/page/${blockId}`

  const navigate = event => {
    if (event.shiftKey) {
      event.preventDefault()
      dispatch(pushView({ type: isPage ? 'page' : 'block', blockId: blockId }))
    }
    if (afterClick) {
      afterClick()
    }
    event.stopPropagation()
  }

  return (
    <Link
      to={to}
      onClick={navigate}
      className={`block-link${noStyling ? ' block-link--no-styling' : ''}`}
      {...rest}
    >
      {children}
    </Link>
  )
}

export default PageLink