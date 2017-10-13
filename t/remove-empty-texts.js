'use strict'

const clone = require('udc')
const filter = require('../lib/filter')
const withText = require('../lib/elements-with-text-content.json')

const indentationOnly = /^\s*$/

const removeEmptyTexts = (input, output) => {
  const tree = clone(input.tree)

  filter(tree, null, (n) => {
    if (n.sel && !withText.includes(n.sel)) return true // non-text element
    if (n.children && n.children.length > 0) return true
    if (n.text && !indentationOnly.test(n.text)) return true
    return false
  })

  output.tree = tree
}

module.exports = removeEmptyTexts
