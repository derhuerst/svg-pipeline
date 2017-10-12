'use strict'

const select = require('snabbdom-selector')
const clone = require('udc')
const hrefs = require('../lib/hrefs')

const removeUnusedDefs = (input, output) => {
  const defs = select('defs', input.tree)[0]
  if (!defs || !defs.children || degs.children.length === 0) return

  const refs = hrefs(input.tree)
    .filter((ref) => ref[0] === '#')
    .map((ref) => ref.slice(1))

  const usedDefs = defs.children
    .filter((d) => refs.includes(d.data.id))
  if (usedDefs.length === defs.children.length) return

  const tree = clone(input.tree)
  select('defs', tree)[0].children = usedDefs
  output.tree = tree
}

module.exports = removeUnusedDefs
