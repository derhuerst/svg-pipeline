'use strict'

const h = require('snabbdom/h').default

const svg = (children) => {
  if (children && !Array.isArray(children)) children = [children]
  return h('svg', {xmlns: 'http://www.w3.org/2000/svg'}, children)
}

// todo: find a better way to do this
const textNode = (text) => ({
  sel: undefined,
  data: undefined,
  children: undefined,
  text,
  elm: undefined,
  key: undefined
})

module.exports = {svg, textNode}
