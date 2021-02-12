import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.scss'

import Main from './features/main/Main'
import FilePane from './features/file-pane/FilePane'
import ViewPane from './features/view-pane/ViewPane'

const App = () => (
  <div className="App">
    <Router>
      <FilePane />
      <Route
        exact={true}
        path="/"
        render={() => (
          <Main blockId={null} />
        )}
      />
      <Route
        path="/page/:blockId"
        render={({ match }) => (
          <Main blockId={match.params.blockId} />
        )}
      />
      <ViewPane />
    </Router>
  </div>
)

export default App