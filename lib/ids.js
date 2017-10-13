'use strict'

const walk = require('./walk')

const ids = (node) => {
  const ids = []
  walk(node, (n) => {
    const id = n.data && (n.data.id || (n.data.attrs && n.data.attrs.id)) || null
    if (id) ids.push(id)

    return !(n.sel && n.sel === 'defs')
  })

  return ids
}

module.exports = ids
