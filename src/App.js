import React from 'react'
import { HashRouter as Router } from 'react-router-dom';

import './App.scss'

import Main from './features/main/Main'
import FilePane from './features/file-pane/FilePane'
import ViewPane from './features/view-pane/ViewPane'

const App = () => (
  <div className="App">
    <Router>
      <FilePane />
      <Main />
      <ViewPane />
    </Router>
  </div>
)

export default App