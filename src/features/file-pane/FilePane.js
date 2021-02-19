import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar3 } from 'react-bootstrap-icons'

import './file-pane.scss'

import Shortcuts from './Shortcuts'
import IO from '../io/io'

const FilePane = props => {
  return (
    <div className="pane file-pane">
      <Link to="/"><h2 className="text-light text-center">Free-roam</h2></Link>
      <IO />
      <div className="list-group list-group-flush mt-3">
        <Link to="/daily-notes" className="list-group-item list-group-item-action bg-dark text-light">
          <Calendar3 color="white" /> Daily Notes
        </Link>
      </div>
      <hr />
      <Shortcuts />
    </div>
  )
}

export default FilePane