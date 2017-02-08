'use strict'

const clone = require('udc')
const filter = require('../lib/filter')
const withText = require('../lib/elements-with-text-content.json')

const minify = (input, output) => {
  const tree = clone(input.tree)

  // remove line breaks & spacing
  filter(tree, (node, parent) => {
    if (node.type !== 'VirtualText') return true
    if (parent.tagName && withText.indexOf(parent.tagName) >= 0) {
      node.text = node.text.replace(/\n/g, '')
      return true
    }
    return false
  })

  output.tree = tree
}

module.exports = minify
