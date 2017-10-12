'use strict'

const walk = require('./walk')

const hrefs = (node) => {
  const hrefs = []

  walk(node, (node) => {
    const href = node.data && node.data.href || node.data['xlink:href'] || null
    if (href) hrefs.push(href)

    return !(node.sel && node.sel === 'defs')
  })

  return hrefs
}

module.exports = hrefs
