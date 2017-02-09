'use strict'

const walk = require('./walk')

const hrefs = (node) => {
  const hrefs = []

  walk(node, (node) => {
    const p = node.properties
    if (p && (p.href || p.attributes['xlink:href']))
      hrefs.push(p.href || p.attributes['xlink:href'])
    return !(node.tagName && node.tagName === 'defs')
  })

  return hrefs
}

module.exports = hrefs
