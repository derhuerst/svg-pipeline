'use strict'

const clone = require('udc')
const createSelector = require('vtree-select')
const hrefs = require('../lib/hrefs')

const removeUnusedDefs = (input, output) => {
  const parent = createSelector('defs')(input.tree)[0]
  if (!parent) return

  const defs = parent.children.filter((n) => n.type === 'VirtualNode')
  if (defs.length === 0) return

  const refs = hrefs(input.tree)
    .filter((ref) => ref[0] === '#')
    .map((ref) => ref.slice(1))

  const usedDefs = defs.filter((d) => refs.includes(d.properties.id))
  if (usedDefs.length === defs.length) return

  const tree = clone(input.tree)
  createSelector('defs')(tree)[0].children = usedDefs
  output.tree = tree
}

module.exports = removeUnusedDefs
