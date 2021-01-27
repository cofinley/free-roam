import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { pushBlock } from '../view-pane/viewPaneSlice'

const PageLink = ({ pageBlockId, children, ...rest }) => {
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
        {...rest}
      >
        {children}
      </Link>
  )
}

export default PageLink