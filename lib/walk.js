'use strict'

const walk = (node, cb) => {
  if (node.children) {
    for (let child of node.children) {
      const recurse = cb(child, node)
      if (recurse && child.children) walk(child, cb)
    }
  }
}

module.exports = walk
