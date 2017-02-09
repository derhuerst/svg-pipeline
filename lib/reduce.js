'use strict'

const innerReduce = (node, cb, level) => {
  node.children = node.children.reduce((children, child, i) => {
    const newChildren = cb(children, child, node, i, level)
    if (child.children) innerReduce(child, cb, level + 1)
    return newChildren
  }, [])
}

const reduce = (node, cb) => {
  if (node.children) innerReduce(node, cb, 0)
}

module.exports = reduce
