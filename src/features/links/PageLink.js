import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import './link.scss'

import { pushBlock } from '../view-pane/viewPaneSlice'

const PageLink = ({ pageBlockId, children, noStyling, ...rest }) => {
  const dispatch = useDispatch()
  const to = `/page/${pageBlockId}`

  const navigate = event => {
    if (event.shiftKey) {
      event.preventDefault()
      dispatch(pushBlock({ blockId: pageBlockId }))
    }
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