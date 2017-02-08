'use strict'

const filter = (node, cb) => {
  if (node.children)
    node.children = node.children.filter((child) => {
      if (!cb(child, node)) return false
      filter(child, cb)
      return true
    })
}

module.exports = filter
