import React from 'react'

import Block from '../block/block'
import TitleBlock from '../block/title-block'

import './editor.scss'

export default class Editor extends React.Component {
  render() {
    const blockLoaded = this.props.block !== undefined
    if (!blockLoaded) {
      return <h1 className="text-light">Page not found</h1>
    }

    const children = this.props.block.children.map(childBlock => (
      <Block
        key={`editor-${childBlock.id}`}
        block={childBlock}
        editBlock={this.props.editBlock}
        getOrCreate={this.props.getOrCreate}
      />
    ))

    return (
      <div className="editor text-light">
        {this.props.block.parent === null &&
          <TitleBlock
            block={this.props.block}
            editBlock={this.props.editBlock}
          />
        }
        {this.props.block.parent !== null &&
          <Block
            block={this.props.block}
            editBlock={this.props.editBlock}
            getOrCreate={this.props.getOrCreate}
          />
        }
        <small className="text-muted">{this.props.block.id}</small>
        <div className="ml-2">
          {children}
        </div>
      </div>
    )
  }
}