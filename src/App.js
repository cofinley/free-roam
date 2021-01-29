import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.scss'

import Main from './features/main/Main'
import FilePane from './features/file-pane/FilePane'
import Editor from './features/editor/Editor'
import ViewPane from './features/view-pane/ViewPane'
import Navbar from './features/navbar/Navbar'

const App = () => (
  <div className="App">
    <Router>
      <FilePane />
      <Main>
        <Navbar />
        <Route
          exact={true}
          path="/"
          render={() => (
            <h1>Welcome</h1>
          )}
        />
        <Route
          path="/page/:blockId"
          render={({ match }) => (
            <Editor blockId={match.params.blockId} isRoot isMain />
          )}
        />
      </Main>
      <ViewPane />
    </Router>
  </div>
)

export default App