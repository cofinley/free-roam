import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import './navbar.scss'

import { updateSearchQuery } from './navbarSlice'

const Navbar = props => {
  const dispatch = useDispatch()
  const searchQuery = useSelector(state => state.navbar.searchQuery)
  const blocks = useSelector(state => state.blocks)
  const searchResultBlocks = Object.values(blocks)
    .filter(block => {
      return block.text.indexOf(searchQuery) !== -1
    })

  const suggestions = searchResultBlocks.map(block => (
    <Link to={`/page/${block.id}`} className="list-group-item list-group-item-action bg-dark text-light" key={block.id}>{block.text}</Link>
  ))

  return (
    <div className="navbar">
      <i className="bi bi-search" />
      <input
        type="text"
        className="form-control navbar__search"
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
  )
}

export default Navbar