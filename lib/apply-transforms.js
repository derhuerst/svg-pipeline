'use strict'

const {toPoints} = require('svg-points')

const attrsByType = {
  circle: ['cx', 'cy', 'r'],
  ellipse: ['cx', 'cy', 'rx', 'ry'],
  line: ['x1', 'x2', 'y1', 'y2'],
  path: ['d'],
  polygon: ['points'],
  polyline: ['points'],
  rect: ['width', 'height', 'x', 'y'] // todo: optional rx, ry
}

// todo: move into an npm package, see colinmeinke/wilderness-dom-node#2
const nodeToShape = (n) => {
  const getAttr = (n, attr) => {
    const val = n.data[attr] || (n.data.attrs && n.data.attrs[attr])
    if (!val) throw new Error(`${n.sel}: missing ${attr} argument`)
    return val
  }

  const attrs = attrsByType[n.sel]
  if (!attrs) throw new Error('unsupported SVG shape ' + n.sel)

  const data = {type: n.sel}
  for (let attr of attrs) data[attr] = getAttr(n, attr)
  return data
}

const applyTransforms = (node, transforms) => {
  const shape = nodeToShape(node)
  const points = toPoints(shape)
  // todo
}

module.exports = applyTransforms
