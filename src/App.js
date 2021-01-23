import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.scss'

import Main from './components/main/main'
import FilePane from './components/file-pane/file-pane'
import Editor from './components/editor/editor'
import ViewPane from './components/view-pane/view-pane'
import Page from './models/page'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pages: new Map(),
      otherBlocks: []
    }
  }

  createPage = () => {
    const page = new Page()
    this.setState((state, props) => ({
      pages: new Map([
        ...state.pages,
        [page.id, page]
      ])
    }))
  }

  render() {
    return (
      <div className="App bg-dark">
        <Router>
          <FilePane
            pages={this.state.pages}
            createPage={this.createPage}
          />
          <Main>
            <Route
              exact={true}
              path="/"
              render={() => (
                <h1 className="text-light">Welcome</h1>
              )}
            />
            <Route
              path="/page/:pageId"
              render={({ match }) => (
                <Editor block={this.state.pages.get(match.params.pageId)}/>
              )}
            />
          </Main>
          <ViewPane
            otherBlocks={this.state.otherBlocks}
          />
        </Router>
      </div>
    )
  }
}