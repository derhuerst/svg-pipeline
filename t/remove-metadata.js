'use strict'

const clone = require('udc')
const filter = require('../lib/filter')

const empty = (input, output) => {
  const tree = clone(input.tree)
  filter(tree, (node) => node.sel ? node.sel !== 'metadata' : true)
  output.tree = tree
}

module.exports = empty
