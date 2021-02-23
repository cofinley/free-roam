import React from 'react'
import { Route, Redirect } from 'react-router-dom';

import './main.scss'

import Editor from '../editor/Editor'
import Navbar from '../navbar/Navbar'
import DailyNotes from '../daily-notes/DailyNotes'
import AllPages from '../all-pages/AllPages'

const Main = ({ blockId }) => {
  return (
    <div className="main">
      <Navbar blockId={blockId}/>
      <div className="stage">
        <Route exact path="/">
          <Redirect to="/page/welcome" />
        </Route>
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
        <Route
          path="/all-pages"
          render={() => (
            <AllPages />
          )}
        />
      </div>
    </div>
  )
}

export default Main