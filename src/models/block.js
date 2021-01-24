import { v4 as uuidv4 } from 'uuid'

const DEFAULT_TEXT = 'Click here to edit'

export default class Block {
  constructor({parent = null, text, children = []}={}) {
    this.id = uuidv4()
    this.parent = parent
    this.text = text
    if (!this.parent) {
      this.children = [new Block({parent: this, text: DEFAULT_TEXT})]
    }
  }
}