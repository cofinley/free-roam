import React from 'react'
import { Link } from 'react-router-dom';

import './file-pane.scss'

export default class FilePane extends React.Component {
  render() {
    const pageListItems = Array.from(this.props.pages).map(pageBlock => (
      <Link to={`/page/${pageBlock.id}`} key={pageBlock.id} className="list-group-item list-group-item-action bg-dark text-light">{pageBlock.text}</Link>
    ))
    return (
      <div className="file-pane">
        <Link to="/"><h2 className="text-light text-center">Free-roam</h2></Link>
        <button className="btn btn-dark mx-auto" type="button" onClick={this.props.createPage}>New Page</button>
        <div className="list-group list-group-flush mt-3">
          {pageListItems}
        </div>
      </div>
    )
  }
}