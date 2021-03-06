import * as blockModel from './blockModel'

describe('blockModel', () => {
  describe('getPage', () => {
    test('should return a block\'s page, no matter the block\'s depth', () => {
      const blocks = {
        a: { id: 'a', parentId: null, text: 'I\'m the page block', childrenIds: ['b'] },
        b: { id: 'b', parentId: 'a', text: 'I\'m a block', childrenIds: ['c'] },
        c: { id: 'c', parentId: 'b', text: 'I\'m a child block' }
      }

      let block = blocks.b
      let expectedPageBlockId = 'a'
      let actualPageBlockId = blockModel.getPage(block, blocks).id
      expect(expectedPageBlockId).toEqual(actualPageBlockId)

      block = blocks.c
      expectedPageBlockId = 'a'
      actualPageBlockId = blockModel.getPage(block, blocks).id
      expect(expectedPageBlockId).toEqual(actualPageBlockId)
    })
  })

  describe('isFirstPageChild', () => {
    test('should return true when the given block is a page\'s first child block', () => {
      const blocks = {
        a: { id: 'a', parentId: null, text: 'I\'m the page block', childrenIds: ['b'] },
        b: { id: 'b', parentId: 'a', text: 'I\'m the page\'s first child block', childrenIds: ['c'] },
        c: { id: 'c', parentId: 'b', text: 'I\'m a child block' },
        d: { id: 'd', parentId: 'a', text: 'I\'m another block' }
      }

      let block = blocks.b
      let result = blockModel.isFirstPageChild(block, blocks)
      expect(result).toBe(true)

      block = blocks.c
      result = blockModel.isFirstPageChild(block, blocks)
      expect(result).toBe(false)

      block = blocks.d
      result = blockModel.isFirstPageChild(block, blocks)
      expect(result).toBe(false)
    })
  })

  describe('getPreviousSibling', () => {
    test('should return a block\'s previous sibling block if one exists, otherwise null', () => {
      const blocks = {
        a: { id: 'a', parentId: null, text: 'I\'m the page block', childrenIds: ['b', 'd'] },
        b: { id: 'b', parentId: 'a', text: 'I\'m a block', childrenIds: ['c'] },
        c: { id: 'c', parentId: 'b', text: 'I\'m a child block', childrenIds: [] },
        d: { id: 'd', parentId: 'a', text: 'I\'m another block', childrenIds: [] }
      }

      let block = blocks.a
      let prevSibling = blockModel.getPrevSibling(block, blocks)
      expect(prevSibling).toBeNull()

      block = blocks.b
      prevSibling = blockModel.getPrevSibling(block, blocks)
      expect(prevSibling).toBeNull()

      block = blocks.c
      prevSibling = blockModel.getPrevSibling(block, blocks)
      expect(prevSibling).toBeNull()

      block = blocks.d
      prevSibling = blockModel.getPrevSibling(block, blocks)
      expect(prevSibling).toEqual(blocks.b)
    })
  })

  describe('getNextSibling', () => {
    test('should return a block\'s next sibling block if one exists, otherwise null', () => {
      const blocks = {
        a: { id: 'a', parentId: null, text: 'I\'m the page block', childrenIds: ['b', 'd'] },
        b: { id: 'b', parentId: 'a', text: 'I\'m a block', childrenIds: ['c'] },
        c: { id: 'c', parentId: 'b', text: 'I\'m a child block', childrenIds: [] },
        d: { id: 'd', parentId: 'a', text: 'I\'m another block', childrenIds: [] }
      }

      let block = blocks.a
      let prevSibling = blockModel.getNextSibling(block, blocks)
      expect(prevSibling).toBeNull()

      block = blocks.b
      prevSibling = blockModel.getNextSibling(block, blocks)
      expect(prevSibling).toEqual(blocks.d)

      block = blocks.c
      prevSibling = blockModel.getNextSibling(block, blocks)
      expect(prevSibling).toBeNull()

      block = blocks.d
      prevSibling = blockModel.getNextSibling(block, blocks)
      expect(prevSibling).toBeNull()
    })
  })

  describe('getLastChildLeaf', () => {
    test('should return a block\'s last child block, recursively', () => {
      const blocks = {
        a: { id: 'a', parentId: null, text: 'I\'m the page block', childrenIds: ['b'] },
        b: { id: 'b', parentId: 'a', text: 'I\'m the first regular block', childrenIds: ['c', 'd'] },
        c: { id: 'c', parentId: 'b', text: 'I\'m a grandchild block', childrenIds: [] },
        d: { id: 'd', parentId: 'b', text: 'I\'m another grandchild block', childrenIds: [] }
      }

      let block = blocks.a
      let lastChildLeaf = blockModel.getLastChildLeaf(block, blocks)
      expect(lastChildLeaf).toEqual(blocks.d)

      block = blocks.b
      lastChildLeaf = blockModel.getLastChildLeaf(block, blocks)
      expect(lastChildLeaf).toEqual(blocks.d)

      block = blocks.c
      lastChildLeaf = blockModel.getLastChildLeaf(block, blocks)
      expect(lastChildLeaf).toEqual(blocks.c)
    })
  })

  describe('getNextBlockUp', () => {
    const blocks = {
      a: { id: 'a', parentId: null, text: 'I\'m the page block', childrenIds: ['b'] },
      b: { id: 'b', parentId: 'a', text: 'I\'m a block', childrenIds: ['c', 'd'] },
      c: { id: 'c', parentId: 'b', text: 'I\'m a child block', childrenIds: [] },
      d: { id: 'd', parentId: 'b', text: 'I\'m another child block', childrenIds: [] }
    }
    test('should return the block visibly above the current if one exists, otherwise null', () => {
      let block = blocks.c
      let nextBlockUp = blockModel.getNextBlockUp(block, blocks)
      expect(nextBlockUp).toEqual(blocks.b)

      block = blocks.d
      nextBlockUp = blockModel.getNextBlockUp(block, blocks)
      expect(nextBlockUp).toEqual(blocks.c)
    })

    test('should return null if the current block is the first one on the page', () => {
      let block = blocks.b
      let nextBlockUp = blockModel.getNextBlockUp(block, blocks)
      expect(nextBlockUp).toBeNull()
    })

    test('should return null if the current block is the page block', () => {
      let block = blocks.a
      let nextBlockUp = blockModel.getNextBlockUp(block, blocks)
      expect(nextBlockUp).toBeNull()
    })
  })

  describe('getNextBlockDown', () => {
    const blocks = {
      a: { id: 'a', parentId: null, text: 'I\'m the page block', childrenIds: ['b'] },
      b: { id: 'b', parentId: 'a', text: 'I\'m the a block', childrenIds: ['c', 'd'] },
      c: { id: 'c', parentId: 'b', text: 'I\'m a child block', childrenIds: [] },
      d: { id: 'd', parentId: 'b', text: 'I\'m another child block', childrenIds: [] }
    }
    test('should return the block visibly below the current if one exists, otherwise null', () => {
      let block = blocks.b
      let nextBlockDown = blockModel.getNextBlockDown(block, blocks)
      expect(nextBlockDown).toEqual(blocks.c)

      block = blocks.c
      nextBlockDown = blockModel.getNextBlockDown(block, blocks)
      expect(nextBlockDown).toEqual(blocks.d)

      block = blocks.d
      nextBlockDown = blockModel.getNextBlockDown(block, blocks)
      expect(nextBlockDown).toBeNull()
    })
    test('should return null if the current block is the page block', () => {
      let block = blocks.a
      let nextBlockDown = blockModel.getNextBlockDown(block, blocks)
      expect(nextBlockDown).toBeNull()
    })
  })
})