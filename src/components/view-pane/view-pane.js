import React from 'react'

import './view-pane.scss'

import Editor from './../editor/editor'

class ViewPane extends React.Component {
  render() {
    const blocks = this.props.otherBlocks.map(block => (
      <div>
        Outline of:
        <Editor key={`view-pane-${block.id}`} block={block}/>
      </div>
    ))
    return (
      <div className="view-pane">
        {blocks}
      </div>
    )
  }
}

export default ViewPane