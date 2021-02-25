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
      <div className="stage">
        <Route exact path="/">
          <Redirect to="/page/welcome" />
        </Route>
        <Route
          path="/page/:blockId"
          render={({ match }) => (
            <>
              <Navbar blockId={match.params.blockId}/>
              <Editor blockId={match.params.blockId} isRoot isMain />
            </>
          )}
        />
        <Route
          path="/daily-notes"
          render={() => (
            <>
              <Navbar />
              <DailyNotes />
            </>
          )}
        />
        <Route
          path="/all-pages"
          render={() => (
            <>
              <Navbar />
              <AllPages />
            </>
          )}
        />
      </div>
    </div>
  )
}

export default Main