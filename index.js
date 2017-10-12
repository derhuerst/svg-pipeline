'use strict'

const parse = require('snabby')
const middl = require('middl')
const stringify = require('snabbdom-to-html')

const createPipeline = () => {
  const pipeline = middl()

  const run = (svg) => {
  	const tree = parse(svg)

    return pipeline.run({tree}, {})
    .then(({tree}) => stringify(tree))
  }

  const out = Object.create(pipeline)
  out.run = run
  return out
}

module.exports = createPipeline
