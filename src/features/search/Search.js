import React from 'react';
import { useSelector } from 'react-redux'

import './search.scss'

import PageLink from '../links/PageLink'

const Search = ({ query, useLinks, onResultClick, onlyPages, allowCreation, onCreateClick }) => {
  const blocks = useSelector(state => state.blocks)

  let suggestions = []
  if (query && query.length) {
    const searchResultBlocks = Object.values(blocks)
      .filter(block => {
        if (onlyPages && block.parentId !== null) {
          return false
        }
        return block.text.indexOf(query) !== -1
      })

    suggestions = searchResultBlocks.map(block => {
      if (useLinks) {
        return (
          <PageLink
            blockId={block.id}
            className="search-result"
            key={block.id}
            afterClick={onResultClick}
          >
            {block.text}
          </PageLink>
        )
      } else {
        return (
          <li
            className="search-result"
            key={block.id}
            onMouseDown={onResultClick.bind(null, block)}
          >
            {block.text}
          </li>
        )
      }
    })

    if (allowCreation) {
      const exactMatchExists = searchResultBlocks
        .find(block => block.text === query) !== undefined
      if (!exactMatchExists) {
        const createPageLink =
          <li
            key={`new-page-${query}`}
            className="search-result"
            onClick={onCreateClick}
          >
            <b>Create</b> {query}
          </li>

        suggestions.splice(0, 0, createPageLink)
      }
    } else if (!suggestions.length) {
        const searchPlaceholder =
          <li key={`default-suggestion`} className="search-result">
            <span>Search for a page</span>
          </li>

        suggestions.splice(0, 0, searchPlaceholder)
    }
  }

  return (
    <React.Fragment>
      {suggestions.length > 0 &&
        <div className="search-results">
          <ul className="list-group list-group-flush">
            {suggestions}
          </ul>
        </div>
      }
    </React.Fragment>
  )
}

export default Search