'use strict'

const clone = require('udc')

const walkWithPath = require('../lib/walk-with-path')
const reduceChain = require('../lib/reduce-chain')

const combineTransforms = (transforms, chain) => {
  if (chain.transform) return transforms.concat(chain.transform)
  else return transforms
}

const flattenTransforms = (input, output) => {
  const tree = clone(input.tree)

  const onEnter = (n, chain) => {
    if (n.data) {
      const transform = (
        n.data.transform
        || (n.data.attrs && n.data.attrs.transform)
        || null
      )
      if (transform) chain.transform = transform
    }
    return true // always recurse
  }

  const onLeave = (node, chain) => {
    if (!node.sel) return
    const currentTransforms = reduceChain(chain, combineTransforms, [])
    // todo: apply collected transforms
  }

  walkWithPath(tree, onEnter, onLeave)
  output.tree = tree
}

module.exports = flattenTransforms
