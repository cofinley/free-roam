import React from 'react'
import { Link } from 'react-router-dom';

import './block.scss'

export default class Block extends React.Component {
  constructor() {
    super()
    this.state = {
      editing: false
    }
  }

  get plaintext() {
    return this.props.block.text
  }

  get rendered() {
    const text = this.plaintext
    const textWithLinks = this.renderLinks(text)
    const textWithItalics = this.renderItalics(textWithLinks)
    const textWithBold = this.renderBold(textWithItalics)
    const html = textWithBold
    return html
  }

  renderLinks(text) {
    var pat = /\[\[([^[\]]*)\]\]/g;
    return text.replace(pat, function(match, textInsideBrackets) {
      const block = this.props.getOrCreate(textInsideBrackets)
      return <Link to={`/page/${block.id}`}>{block.text}</Link>
    })
  }

  renderItalics(text) {
    var pat = /_([^_]*)_/g;
    return text.replace(pat, function(match, italicText) {
      return <i>{italicText}</i>
    })
  }

  renderBold(text) {
    var pat = /\*\*([^*]*)\*\*/g;
    return text.replace(pat, function(match, boldText) {
      return <b>{boldText}</b>
    })
  }

  edit = event => {
    this.setState({
      editing: true
    })
  }

  save = event => {
    this.props.editBlock(this.props.block, event.target.value)
    this.setState({
      editing: false
    })
  }

  render() {
    if (this.state.editing) {
      return (
        <textarea
          className="block block--edit text-light"
          autoFocus
          onBlur={this.save}
          defaultValue={this.plaintext}
        />
      )
    }
    return (
      <span className="block block--rendered" onClick={this.edit}>{this.rendered}</span>
    )
  }
}