'use strict'

const clone = require('udc')

const empty = (input, output) => {
  const svg = clone(input.tree)
  svg.children = []
  output.tree = svg
}

module.exports = empty
