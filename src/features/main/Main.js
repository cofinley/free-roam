import React from 'react'
import { Route, Redirect } from 'react-router-dom';

import './main.scss'

import Editor from '../editor/Editor'
import Navbar from '../navbar/Navbar'
import DailyNotes from '../daily-notes/DailyNotes'
import AllPages from '../all-pages/AllPages'

const Main = props => {
  return (
    <div className="main">
      <Route exact path="/">
        <Redirect to="/page/welcome" />
      </Route>
      <Route
        path="/page/:blockId"
        render={({ match }) => (
          <>
            <Navbar blockId={match.params.blockId} />
            <div className="stage">
              <Editor blockId={match.params.blockId} isRoot isMain />
            </div>
          </>
        )}
      />
      <Route
        path="/daily-notes"
        render={() => (
          <>
            <Navbar />
            <div className="stage">
              <DailyNotes />
            </div>
          </>
        )}
      />
      <Route
        path="/all-pages"
        render={() => (
          <>
            <Navbar />
            <div className="stage">
              <AllPages />
            </div>
          </>
        )}
      />
    </div>
  )
}

export default Main