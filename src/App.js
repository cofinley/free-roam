import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.scss'

import Main from './components/main/main'
import FilePane from './components/file-pane/file-pane'
import Editor from './components/editor/editor'
import ViewPane from './components/view-pane/view-pane'
import Navbar from './components/navbar/navbar'
import BlockModel from './models/block'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blocks: new Map(),
      viewPaneBlocks: [],
      searchResults: []
    }
  }

  createPageClick = event => {
    return this.createPage()
  }

  createPage = text => {
    const pageBlock = new BlockModel({ text: text })
    this.setState((state, props) => ({
      blocks: new Map([
        ...state.blocks,
        [pageBlock.id, pageBlock]
      ])
    }))
    return pageBlock
  }

  editBlock = (block, newText) => {
    const updatedBlock = Object.assign({}, block)
    updatedBlock.text = newText
    this.setState((state, props) => ({
      blocks: new Map(state.blocks).set(block.id, updatedBlock)
    }))
  }

  search = event => {
    this.setState({
      searchResults: []
    })
    const query = event.target.value
    if (!query) {
      return
    }
    const searchResults = Array.from(this.state.blocks)
      .map(([blockId, block]) => block)
      .filter(block => block.text.indexOf(query) !== -1)
    this.setState({
      searchResults: searchResults
    })
  }

  getOrCreate = blockText => {
    const existingBlock = Array.from(this.state.blocks)
      .map(([blockId, block]) => block)
      .find(block => block.text === blockText)
    if (!existingBlock) {
      const newBlock = this.createPage(blockText)
      return newBlock
    }
    return existingBlock
  }

  render() {
    const pages = Array.from(this.state.blocks)
      .map(([blockId, block]) => block)
      .filter(block => !block.parent)
    return (
      <div className="App">
        <Router>
          <FilePane
            pages={pages}
            createPage={this.createPageClick}
          />
          <Main>
            <Navbar
              searchOrCreate={this.search}
              searchResults={this.state.searchResults}
            />
            <Route
              exact={true}
              path="/"
              render={() => (
                <h1>Welcome</h1>
              )}
            />
            <Route
              path="/page/:pageId"
              render={({ match }) => (
                <Editor
                  block={this.state.blocks.get(match.params.pageId)}
                  editBlock={this.editBlock}
                  getOrCreate={this.getOrCreate}
                />
              )}
            />
          </Main>
          <ViewPane blocks={this.state.viewPaneBlocks}/>
        </Router>
      </div>
    )
  }
}