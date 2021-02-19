import React from 'react'
import { Route } from 'react-router-dom';

import './main.scss'

import Editor from '../editor/Editor'
import Navbar from '../navbar/Navbar'
import DailyNotes from '../daily-notes/DailyNotes'

const Main = ({ blockId }) => {
  return (
    <div className="main">
      <Navbar blockId={blockId}/>
      <Route
        exact={true}
        path="/"
        render={() => (
          <Editor blockId={null} isRoot isMain />
        )}
      />
      <Route
        path="/page/:blockId"
        render={({ match }) => (
          <Editor blockId={match.params.blockId} isRoot isMain />
        )}
      />
      <Route
        path="/daily-notes"
        render={() => (
          <DailyNotes />
        )}
      />
    </div>
  )
}

export default Main