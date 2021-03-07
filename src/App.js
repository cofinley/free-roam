import React, { useState } from 'react'
import { HashRouter as Router } from 'react-router-dom';
import { List } from 'react-bootstrap-icons'

import './App.scss'

import Main from './features/main/Main'
import FilePane from './features/file-pane/FilePane'
import ViewPane from './features/view-pane/ViewPane'

const App = () => {
  const [showFilePane, setShowFilePane] = useState(true)
  const [showViewPane, setShowViewPane] = useState(true)

  return (
    <div className="App">
      <Router>
        {showFilePane
          ? <FilePane setShowFilePane={setShowFilePane} />
          : <div className="show-sidebar__button" onClick={() => setShowFilePane(true)}>
              <List size={20} />
            </div>
        }
        <Main />
        {showViewPane
          ? <ViewPane setShowViewPane={setShowViewPane} />
          : <div className="show-sidebar__button" onClick={() => setShowViewPane(true)}>
              <List size={20} />
            </div>
        }
      </Router>
    </div>
  )
}

export default App