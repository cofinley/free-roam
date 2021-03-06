import getCaretCoordinates from 'textarea-caret'

export const getCaretInfo = (text, caretPos) => {
  const wikiLinkRegex = /\[\[([^\]]*(?:\]\])?)\]\]/gm
  const matches = text.matchAll(wikiLinkRegex)

  let startBracketIndex = -1
  let endBracketIndex = -1
  let caretInBrackets = false
  let textInBrackets = null

  for (const match of matches) {
    const textWithBrackets = match[0]
    const startBracketIndex = match.index
    const endBracketIndex = startBracketIndex + textWithBrackets.length - 2
    caretInBrackets = (startBracketIndex + 2) <= caretPos && caretPos <= endBracketIndex
    if (caretInBrackets) {
      textInBrackets = match[1]
      return { startBracketIndex, endBracketIndex, caretInBrackets, textInBrackets }
    }
  }
  return { startBracketIndex, endBracketIndex, caretInBrackets, textInBrackets }
}

export const isCaretOnFirstRow = (textarea, lineHeight) => {
  const { top } = getCaretCoordinates(textarea, textarea.selectionStart)
  return top <= lineHeight
}

export const isCaretOnLastRow = (textarea, lineHeight) => {
  const { top } = getCaretCoordinates(textarea, textarea.selectionStart)
  return textarea.offsetHeight <= top + lineHeight
}