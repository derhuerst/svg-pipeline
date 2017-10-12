'use strict'

const walk = require('./walk')

const ids = (node) => {
  const ids = []
  walk(node, (node) => {
  	const attrs = node.properties && node.properties.attributes || null
    if (attrs && attrs.id) ids.push(attrs.id)

    return !(node.tagName && node.tagName === 'defs')
  })

  return ids
}

module.exports = ids
