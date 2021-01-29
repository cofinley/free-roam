import React from 'react'

import './main.scss'

import Editor from '../editor/Editor'
import Navbar from '../navbar/Navbar'

const Main = ({ blockId }) => {
  return (
    <div className="main">
      <Navbar blockId={blockId}/>
      <Editor blockId={blockId} isRoot isMain />
    </div>
  )
}

export default Main