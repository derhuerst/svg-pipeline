'use strict'

const recurse = (node, tree) => {
  if (tree.children) {
    if (tree.children.includes(node)) return tree

    for (let child of tree.children) {
      const found = recurse(node, child)
      if (found) return found
    }
  }
}

const findParent = (node, tree) => {
  if (tree === node) return null // node is root, no parent
  if (node.data && node.data.parent && node.data.parent.sel) return node.data.parent
  return recurse(node, tree)
}

module.exports = findParent
