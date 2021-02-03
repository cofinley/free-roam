import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './navbar.scss'

import { Star, StarFill, Search } from 'react-bootstrap-icons'
import { updateSearchQuery } from './navbarSlice'
import { toggleShortcut } from '../file-pane/filePaneSlice'
import PageLink from '../links/PageLink'

const Navbar = ({ blockId }) => {
  const dispatch = useDispatch()
  const searchQuery = useSelector(state => state.navbar.searchQuery)
  const blocks = useSelector(state => state.blocks)
  const favoriteBlockIds = useSelector(state => state.filePane.favoriteBlockIds)

  const getRoot = block => {
    if (!block.parentId) {
      return block.id
    }
    return getRoot(blocks[block.parentId])
  }

  let isFavorite
  if (blockId) {
    const block = blocks[blockId]
    if (block) {
      const rootBlockId = getRoot(block)
      isFavorite = favoriteBlockIds.includes(rootBlockId)
    }
  }

  const toggleFavorite = event => {
    const rootBlockId = getRoot(blocks[blockId])
    dispatch(toggleShortcut({ blockId: rootBlockId }))
  }

  let favoriteButton
  if (isFavorite !== undefined) {
    if (isFavorite) {
      favoriteButton = <StarFill color="white" />
    } else {
      favoriteButton = <Star color="white" />
    }
  }

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
      <div className="navbar__search">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text bg-dark text-dark border-secondary"><Search color="white"/></span>
          </div>
          <input
            type="text"
            className="form-control bg-dark text-light border-secondary"
            placeholder="Find or Create Page"
            onChange={(event) => dispatch(updateSearchQuery({ query: event.target.value }))}
          />
        </div>
        {suggestions.length > 0 &&
          <div className="navbar__search-results">
            <ul className="list-group list-group-flush">
              {suggestions}
            </ul>
          </div>
        }
      </div>
      {favoriteButton !== undefined &&
        <button className="btn btn--toggle-favorite" onClick={toggleFavorite}>{favoriteButton}</button>
      }
    </div>
  )
}

export default Navbar