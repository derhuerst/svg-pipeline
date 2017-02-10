'use strict'

const clone = require('udc')
const filter = require('../lib/filter')
const withText = require('../lib/elements-with-text-content.json')

const textAndIndentation = /^[\s\n]*$/

const removeEmptyTexts = (input, output) => {
  const tree = clone(input.tree)
  filter(tree, (node) => {
    if (node.tagName && withText.includes(node.tagName)) {
      if (node.children.some((child) => child.type !== 'VirtualText')) return true
      const text = node.children.map((child) => child.text).join('')
      return !text.match(textAndIndentation)
    }
    return true
  })
  output.tree = tree
}

module.exports = removeEmptyTexts
