import React from 'react'

import './view-pane.scss'

import Block from '../editor/editor'

export default class ViewPane extends React.Component {
  render() {
    const blocks = this.props.blocks.map(block => (
      <div>
        Outline of:
        <Block key={`view-pane-${block.id}`} block={block}/>
      </div>
    ))
    return (
      <div className="view-pane">
        {blocks}
      </div>
    )
  }
}