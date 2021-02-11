import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import { Star, StarFill, Search as SearchIcon } from 'react-bootstrap-icons'

import './navbar.scss'

import { updateSearchQuery } from './navbarSlice'
import { toggleShortcut } from '../file-pane/filePaneSlice'
import { BlockModel, addBlock } from '../block/blockSlice'
import Search from '../search/Search'

const Navbar = ({ blockId }) => {
  const dispatch = useDispatch()
  const searchQuery = useSelector(state => state.navbar.searchQuery)
  const blocks = useSelector(state => state.blocks)
  const favoriteBlockIds = useSelector(state => state.filePane.favoriteBlockIds)
  const history = useHistory()

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

  const clearSearch = event => {
    dispatch(updateSearchQuery({ query: '' }))
  }

  const createAndNavigateToPage = () => {
    const page = BlockModel({ text: searchQuery })
    dispatch(addBlock(page))
    clearSearch()
    history.push(`/page/${page.id}`)
  }

  return (
    <div className="navbar">
      <div className="search-container">
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text bg-dark text-dark border-secondary"><SearchIcon color="white" /></span>
          </div>
          <input
            type="text"
            className="form-control bg-dark text-light border-secondary"
            placeholder="Find or Create Page"
            onChange={(event) => dispatch(updateSearchQuery({ query: event.target.value }))}
            value={searchQuery}
          />
        </div>
        <Search
          query={searchQuery}
          useLinks
          onResultClick={clearSearch}
          allowCreation
          onCreateClick={createAndNavigateToPage}
        />
      </div>
      {favoriteButton !== undefined &&
        <button className="btn btn--toggle-favorite" onClick={toggleFavorite}>{favoriteButton}</button>
      }
    </div>
  )
}

export default Navbar