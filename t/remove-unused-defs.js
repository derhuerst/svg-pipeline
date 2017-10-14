'use strict'

const {select} = require('snabbdom-selector')
const clone = require('udc')

const ids = require('../lib/ids')
const hrefs = require('../lib/hrefs')
const filter = require('../lib/filter')
const findParent = require('../lib/find-parent')

const findUsedDefIds = (tree) => {
  const defsEl = select('defs', tree)[0]
  if (!defsEl) return

  const refs = hrefs(tree)
    .filter(ref => ref[0] === '#') // only relative
    .map(ref => ref.slice(1))

  const defIds = ids(defsEl)
  if (defIds.length === 0) return

  const usedDefIds = defIds.filter(id => refs.includes(id))
  if (usedDefIds.length === defIds.length) return

  return usedDefIds
}

const removeUnusedDefs = (input, output) => {
  const usedDefIds = findUsedDefIds(input.tree)
  if (!usedDefIds) return // no change necessary

  const tree = clone(input.tree)
  const defsEl = select('defs', tree)[0]

  filter(defsEl, (n) => {
    const id = n.data && (n.data.id || (n.data.attrs && n.data.attrs.id))
    if (!id) return true // keep els without id
    return usedDefIds.includes(id)
  })

  if (!defsEl.children || defsEl.children.length === 0) {
    // remove <defs> itself
    const parent = findParent(defsEl, tree)
    const i = parent.children.indexOf(defsEl)
    parent.children.splice(i, 1)
  }

  output.tree = tree
}

module.exports = removeUnusedDefs
