'use strict'

const reduceChain = (chain, fn, initialVal) => {
  let val = initialVal

  while (chain) {
    val = fn(val, chain)
    chain = chain.parent
  }

  return val
}

module.exports = reduceChain
