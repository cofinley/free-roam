import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar3, Justify, List, CaretLeftFill } from 'react-bootstrap-icons'

import './file-pane.scss'

import Shortcuts from './Shortcuts'
import IO from '../io/io'

const FilePane = ({ setShowFilePane }) => {
  return (
    <div className="pane file-pane">
      <div className="hide-sidebar" onClick={() => setShowFilePane(false)}>
        <div className="hide-sidebar__button"><CaretLeftFill size={10} style={{marginRight: "-3px"}} /><List size={20}/></div>
      </div>
      <Link to="/"><h2 className="text-light text-center">Free-roam</h2></Link>
      <IO />
      <div className="list-group list-group-flush mt-3">
        <Link to="/daily-notes" className="file-pane__item">
          <Calendar3 color="white" /> Daily Notes
        </Link>
        <Link to="/all-pages" className="file-pane__item">
          <Justify color="white" /> All Pages
        </Link>
      </div>
      <hr className="border-top" />
      <Shortcuts />
    </div>
  )
}

export default FilePane