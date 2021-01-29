import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './navbar.scss'

import { updateSearchQuery } from './navbarSlice'
import PageLink from '../links/PageLink'

const Navbar = props => {
  const dispatch = useDispatch()
  const searchQuery = useSelector(state => state.navbar.searchQuery)
  const blocks = useSelector(state => state.blocks)

  const clearSearch = () => {
    dispatch(updateSearchQuery({ query: '' }))
  }

  let suggestions = []
  if (searchQuery && searchQuery.length) {
    const searchResultBlocks = Object.values(blocks)
      .filter(block => {
        return !block.parentId && block.text.indexOf(searchQuery) !== -1
      })

    suggestions = searchResultBlocks.map(block => (
      <PageLink
        pageBlockId={block.id}
        className="list-group-item list-group-item-action bg-dark text-light"
        key={block.id}
        onClick={clearSearch}
      >
        {block.text}
      </PageLink>
    ))
  }

  return (
    <div className="navbar">
      <div></div>
      <div className="navbar__search">
        <input
          type="text"
          className="form-control"
          placeholder="Find or Create Page"
          onChange={(event) => dispatch(updateSearchQuery({ query: event.target.value }))}
        />
        {suggestions.length > 0 &&
          <div className="navbar__search-results">
            <ul className="list-group list-group-flush">
              {suggestions}
            </ul>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar