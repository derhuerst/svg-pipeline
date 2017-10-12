'use strict'

const walk = require('./walk')

const noop = () => {}

const walkWithPath = (node, _onEnter, _onLeave = noop) => {
  let chain = null

  const onEnter = (node, parent) => {
    chain = {val: node, parent: chain}
    return _onEnter(node, chain)
  }

  const onLeave = (node, parent) => {
    const res = _onLeave(node, chain)
    chain = chain && chain.parent || null
    return res
  }

  return walk(node, onEnter, onLeave)
}

module.exports = walkWithPath
