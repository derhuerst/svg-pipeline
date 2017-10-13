'use strict'

const walk = require('./walk')

const hrefs = (node) => {
  const hrefs = []

  walk(node, (n) => {
    const d = n.data || null
    if (n.data) {
      const d = n.data
      const href = (
        d.href || d['xlink:href']
        || (d.attrs && (d.attrs.href || d.attrs['xlink:href']))
        || null
      )
      if (href) hrefs.push(href)
    }

    return !(n.sel && n.sel === 'defs')
  })

  return hrefs
}

module.exports = hrefs
