'use strict'

const clone = require('udc')
const parseTransform = require('svg-transform-parser').parse

const walkWithPath = require('../lib/walk-with-path')
const reduceChain = require('../lib/reduce-chain')

const combineTransforms = (transforms, chain) => {
  if (chain.transform) return transforms.concat(chain.transform)
  else return transforms
}

const flattenTransforms = (input, output) => {
  const tree = clone(input.tree)

  const onEnter = (node, chain) => {
    const attrs = node.properties && node.properties.attributes || null
    const transform = attrs && attrs.transform || null
    if (transform) chain.transform = parseTransform(transform)

    return true
  }

  const onLeave = (node, chain) => {
    const currentTransforms = reduceChain(chain, combineTransforms, [])
    // todo: apply collected transforms
  }

  walkWithPath(tree, onEnter, onLeave)
  output.tree = tree
}

module.exports = flattenTransforms
