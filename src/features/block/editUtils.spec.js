import { getCaretInfo } from './editUtils'

describe('editUtils', () => {
  const testCases = [
    {
      text: 'ab|c',
      caretPos: 2,
      caretInfo: {
        startBracketIndex: -1,
        endBracketIndex: -1,
        caretInBrackets: false,
        textInBrackets: null
      }
    }, {
      text: '[[ab|c',
      caretPos: 4,
      caretInfo: {
        startBracketIndex: -1,
        endBracketIndex: -1,
        caretInBrackets: false,
        textInBrackets: null
      }
    }, {
      text: '[[a]] b|c',
      caretPos: 7,
      caretInfo: {
        startBracketIndex: -1,
        endBracketIndex: -1,
        caretInBrackets: false,
        textInBrackets: null
      }
    }, {
      text: '[[[[a]] b|c',
      caretPos: 9,
      caretInfo: {
        startBracketIndex: -1,
        endBracketIndex: -1,
        caretInBrackets: false,
        textInBrackets: null
      }
    }, {
      text: '[[ab|c]]',
      caretPos: 4,
      caretInfo: {
        startBracketIndex: 0,
        endBracketIndex: 6,
        caretInBrackets: true,
        textInBrackets: 'ab|c'
      }
    }, {
      text: '[[[[ab|c]]',
      caretPos: 6,
      caretInfo: {
        startBracketIndex: 0,
        endBracketIndex: 8,
        caretInBrackets: true,
        textInBrackets: '[[ab|c'
      }
    }, {
      text: '[[[[ab|c]]]]',
      caretPos: 6,
      caretInfo: {
        startBracketIndex: 0,
        endBracketIndex: 10,
        caretInBrackets: true,
        textInBrackets: '[[ab|c]]'
      }
    }

  ]

  test.each(testCases)('getCaretInfo(%o)', testCase => {
    expect(getCaretInfo(testCase.text, testCase.caretPos)).toEqual(testCase.caretInfo)
  })
})