import React from 'react'

export default class TitleBlock extends React.Component {
  render() {
    return (
      <h1 className="block block--title">{this.props.block.text}</h1>
    )
  }
}