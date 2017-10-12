'use strict'

const filter = (node, cb) => {
  if (node.children) {
  	node.children = node.children.filter((child) => {
      if (!cb(child, node)) return false
      filter(child, cb)
      return true
    })
    // todo: is this the correct way to mutate a VNode?
    node.count = node.children.length
  }
  return node
}

module.exports = filter
