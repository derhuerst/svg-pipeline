'use strict'

const createParser = require('html-to-vdom')
const VNode = require('virtual-dom/vnode/vnode')
const VText = require('virtual-dom/vnode/vtext')
const middl = require('middl')
const stringify = require('vdom-to-html')

const parse = createParser({VNode, VText})

const createPipeline = () => {
  const pipeline = middl()

  const run = (svg) => {
  	const tree = parse(svg)[0]
  	if (!tree) return Promise.reject('failed to parse the SVG')

    return pipeline.run({tree}, {})
    .then(({tree}) => stringify(tree))
  }

  const out = Object.create(pipeline)
  out.run = run
  return out
}

module.exports = createPipeline
