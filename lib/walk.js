'use strict'

const noop = () => {}

const walk = (node, onEnter, onLeave = noop) => {
  if (node.children) {
    for (let child of node.children) {
      const recurse = onEnter(child, node)
      if (recurse && child.children) walk(child, onEnter, onLeave)
      onLeave(child, node)
    }
  }
}

module.exports = walk
