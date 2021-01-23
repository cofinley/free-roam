import { v4 as uuidv4 } from 'uuid'

const DEFAULT_TEXT = 'Click here to edit'

export default class Block {
    constructor({parent = null, children = [], text = DEFAULT_TEXT}={}) {
      this.id = uuidv4()
      this.parent = parent
      this.children = children
      this.text = text
    }
}