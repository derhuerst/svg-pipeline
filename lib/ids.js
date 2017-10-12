'use strict'

const walk = require('./walk')

const ids = (node) => {
  const ids = []
  walk(node, (node) => {
    if (node.data && node.data.id) ids.push(node.data.id)

    return !(node.sel && node.sel === 'defs')
  })

  return ids
}

module.exports = ids
