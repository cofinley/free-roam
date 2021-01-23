import React from 'react'

import './editor.scss'

class Editor extends React.Component {
  render() {
    const blockLoaded = this.props.block !== undefined
    if (!blockLoaded) {
      return (
        <h1 className="text-light">Page not found</h1>
      )
    }
    const children = this.props.block.children.map(childBlock => (
      <Editor key={`editor-${childBlock.id}`} block={childBlock}/>
    ))
    return (
      <div className="editor text-light">
        {this.props.block.parent === null &&
          <h1>{this.props.block.text}</h1>
        }
        {this.props.block.parent !== null &&
          <p>{this.props.block.text}</p>
        }
        <small className="text-muted">{this.props.block.id}</small>
        <div className="ml-2">
          <span>{children}</span>
        </div>
      </div>
    )
  }
}

export default Editor