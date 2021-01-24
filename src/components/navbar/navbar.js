import React from 'react'
import { Link } from 'react-router-dom'

import './navbar.scss'

export default class Navbar extends React.Component {
  render() {
    const suggestions = this.props.searchResults.map(suggestedBlock => (
      <Link to={`/page/${suggestedBlock.id}`} className="list-group-item list-group-item-action bg-dark text-light" key={suggestedBlock.id}>{suggestedBlock.text}</Link>
    ))
    return (
      <div className="navbar">
        <i className="bi bi-search" />
        <input type="text" className="form-control navbar__search" onInput={this.props.searchOrCreate} placeholder="Find or Create Page" />
        {this.props.searchResults &&
          <div className="navbar__search-results">
            <ul className="list-group list-group-flush">
              {suggestions}
            </ul>
          </div>
        }
      </div>
    )
  }
}