'use strict'

const walk = require('./walk')

const hrefs = (node) => {
  const hrefs = []

  walk(node, (node) => {
    const p = node.properties || null
    const a = p && p.attributes || null
    const href = p.href || p['xlink:href'] || a.href || a['xlink:href'] || null
    if (href) hrefs.push(href.value || href)

    return !(node.tagName && node.tagName === 'defs')
  })

  return hrefs
}

module.exports = hrefs
