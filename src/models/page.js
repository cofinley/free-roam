import Block from "./block";

const NEW_PAGE_TITLE = 'New Page'

export default class Page extends Block{
    constructor() {
        super({text: NEW_PAGE_TITLE})
        this.children = [new Block({parent: this})]
    }
}