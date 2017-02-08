'use strict'

const createParser = require('html-to-vdom')
const VNode = require('virtual-dom/vnode/vnode')
const VText = require('virtual-dom/vnode/vtext')
const middl = require('middl')
const stringify = require('vdom-to-html')

const parse = createParser({VNode, VText})

const createPipeline = () => {
  const pipeline = middl()

  const run = (svg) =>
    pipeline.run({
      tree: parse(svg)[0]
    }, {})
    .then(({tree}) => stringify(tree))

  const out = Object.create(pipeline)
  out.run = run
  return out
}

module.exports = createPipeline
