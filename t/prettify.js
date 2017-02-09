'use strict'

const clone = require('udc')
const reduce = require('../lib/reduce')
const withText = require('../lib/elements-with-text-content.json')

const isLastChild = (child, parent) =>
  parent.children[parent.children.length - 1] === child

const trailingIndent = /\n\s*$/m

const prettify = (indent = '  ') => (input, output) => {
  const tree = clone(input.tree)

  // remove line breaks & spacing
  reduce(tree, (children, c, p, i, level) => {
    if (c.type === 'VirtualText') {
      if (p.tagName && withText.indexOf(p.tagName) === -1 && !isLastChild(c, p)) {
        c.text = '\n' + indent.repeat(level + 1)
      } else {
        c.text = c.text.replace(trailingIndent, '\n' + indent.repeat(level))
      }
    }
    children.push(c)
    return children
  })

  output.tree = tree
}

module.exports = prettify
