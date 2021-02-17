import React from 'react'
import { Link } from 'react-router-dom'

import './file-pane.scss'

import Shortcuts from './Shortcuts'
import IO from '../io/io'

const FilePane = props => {
  return (
    <div className="pane file-pane">
      <Link to="/"><h2 className="text-light text-center">Free-roam</h2></Link>
      <IO />
      <hr />
      <Shortcuts />
    </div>
  )
}

export default FilePane