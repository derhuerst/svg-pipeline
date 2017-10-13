'use strict'

const keep = () => true

const filter = (node, onEnter, onLeave) => {
  if (!onEnter) onEnter = keep
  if (!onLeave) onLeave = keep

  if (node.children) {
    node.children = node.children.filter((child) => {
      if (!onEnter(child, node)) return false
      filter(child, onEnter, onLeave)
      if (!onLeave(child, node)) return false
      return true
    })

    if (node.children.length === 0) {
      node.children = undefined
    }
  }
  return node
}

module.exports = filter
